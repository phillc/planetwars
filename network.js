var sys = require("sys");
require("./underscore");

var networks = require("./networkDefinition").networks;

var weights;
// if(process.argv.length > 2) {
    weights = require("./" + process.argv[2]).weights
// } else {
    // weights = require("./weights").weights;
// }
    
var sigmoid = function(t) {
    return 1/(1+Math.exp(-t));
}
exports.sigmoid = sigmoid;

var compute = function(networkName, values) {
    var network = networks[networkName];
    var keys = _.keys(values);
    var network_input_weights = weights[networkName].input_weights;
    var network_hidden_weights = weights[networkName].hidden_weights;
    
    var hidden_layer_results = [];
    for(var weight_set_number in network_input_weights) {
        var input_weights = network_input_weights[weight_set_number];
        hidden_layer_results.push(_.reduce(keys, function(memo, key){
            return memo + sigmoid(values[key] * input_weights[key]);
        }, 0));
    }
    
    var result = 0;
    for(var hidden_layer_result_num in hidden_layer_results) {
        result += sigmoid(hidden_layer_results[hidden_layer_result_num] + network_hidden_weights[hidden_layer_result_num])
    }
}
exports.compute = compute;

