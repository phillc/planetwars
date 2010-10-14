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

var timeDiff = function() {
    return currentTime() - startTime;
}

var checkTime = function(){
    if(timeDiff() > 800) {
        sys.debug("********* TIMED OUT ***********")
        throw TIME_ERROR;
    };
}
exports.checkTime = checkTime;

var sayTime = function () {
    sys.debug("TIME: " + timeDiff());
}
exports.sayTime = sayTime;
