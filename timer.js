var sys = require('sys');
var startTime;

var TIME_ERROR = "Time!"
exports.TIME_ERROR = TIME_ERROR;

var currentTime = function(){
    return (new Date()).valueOf();
}

var setStartTime = function(){
    startTime = currentTime();
}
exports.setStartTime = setStartTime;

var checkTime = function(){
    if(currentTime() - startTime > 800) {
        sys.debug("********* TIMED OUT ***********")
        throw TIME_ERROR;
    };
}
exports.checkTime = checkTime;
