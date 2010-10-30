var sys = require("sys");
// require("./underscore");

// var networks = require("./networkDefinition").networks;
// 
// var weights;
// if(process.argv.length > 2) {
//     weights = require("./" + process.argv[2]).weights
// } else {
//     weights = require("./weights").weights;
// }

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