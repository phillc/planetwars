var sys = require("sys");
require("./underscore");

var networks = require("./networkDefinition").networks,
    weights = require("./weights").weights;

var sigmoid = function(t) {
    return 1/(1+Math.exp(-t));
}
exports.sigmoid = sigmoid;

var compute = function(networkName, values) {
    sys.debug(weights)
    var network = networks[networkName];
    var keys = values.keys;
    var network_input_weights = weights[networkName].input_weights;
    var network_hidden_weights = weights[networkName].hidden_weights;
    
    var hidden_layer_results = [];
    for(var weight_set_number in network_input_weights) {
        var weights = network_input_weights[weight_set_number];
        hidden_layer_results.push(_.reduce(keys, function(memo, key){
            return memo + sigmoid(values[key] * weights[key]);
        }, 0));
    }
    
    var result = 0;
    for(var hidden_layer_result_num in hidden_layer_results) {
        result += sigmoid(hidden_layer_results[hidden_layer_result_num] + network_hidden_weights[hidden_layer_result_num])
    }
}
exports.compute = compute;

