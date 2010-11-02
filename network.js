var sys = require("sys");
require("./underscore");

var networks = require("./networkDefinition").networks;

var weights;
if(process.argv.length > 2) {
    weights = require("./" + process.argv[2]).weights
} else {
    weights = require("./weights").weights;
}

var activation = function() {
    var exp = Math.exp;
    var tanh = function(x) { 
        var expOfNegX = exp(-x)
        return (1 - expOfNegX) / (1 + expOfNegX);
    };
    
    return function(t) { 
        if(t > 20) {
            return 1;
        }
        if(t < -20) {
            return -1;
        }
        return tanh(t)
    };
}();
exports.activation = activation;

var compute = function(networkName, values) {
    // var network = networks[networkName];
    var keys = _.keys(values);
    var network_input_weights = (weights[networkName] && weights[networkName].input_weights) || [];
    var network_hidden_weights = (weights[networkName] && weights[networkName].hidden_weights) || [];
    
    var hidden_layer_results = [];
    for(var weight_set_number in network_input_weights) {
        var input_weights = network_input_weights[weight_set_number];
        hidden_layer_results.push(_.reduce(keys, function(memo, key){
            // sys.debug("key: " + key + " values[key]: " + values[key])
            if (typeof values[key] !== "number") {
                sys.debug("" + key + " wasnt a number yo " + values[key])
                throw "Not a number";
            }
            return memo + activation(values[key] * (input_weights[key] || 0));
        }, 0));
    }
        
    var result = 0;
    for(var hidden_layer_result_num in hidden_layer_results) {
        result += activation(hidden_layer_results[hidden_layer_result_num] * (network_hidden_weights[hidden_layer_result_num] || 0))
    }
    
    if(isNaN(result)){
        throw "result is NaN";
    }
    return result;
}
exports.compute = compute;