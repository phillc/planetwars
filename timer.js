var startTime;

var TIME_ERROR = "Time!"
exports.TIME_ERROR = TIME_ERROR;

var currentTime = function(){
    return (new Date()).valueOf();
}

var timeDiff = function() {
    return currentTime() - startTime;
}

exports.setStartTime = function(){
    startTime = currentTime();
}

exports.checkTime = function(){
    if(timeDiff() > 700) {
        console.error("********* TIMED OUT ***********")
        throw TIME_ERROR;
    };
}

exports.isTimeException = function(err) {
    return err === TIME_ERROR;
}

exports.sayTime = function () {
    console.error("TIME: " + timeDiff());
}
