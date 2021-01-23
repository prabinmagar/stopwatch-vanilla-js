
const _hour = document.getElementById('hour'),
      _minute = document.getElementById('minute'),
      _second = document.getElementById('second'),
      _millisecond = document.getElementById('millisecond'),
      startBtn = document.getElementById('start-btn'),
      resetBtn = document.getElementById('reset-btn');

let hour = 0, minute = 0, second = 0 , millisecond = 0;
pausedBtnOff = true;
let swInterval, stopTimeDiff = 0, tempTime = 0;

startBtn.addEventListener('click', () => {
    let startTime = Date.now();
    tempTime = stopTimeDiff;
    if(pausedBtnOff){
        stopwatch(startTime);
        pausedBtnOff = false;
        startBtn.innerHTML = "Pause";
    } else {
        hour = 0, minute = 0, second = 0, millisecond = 0;
        displayUI();
        clearInterval(swInterval);
        timeConversion(stopTimeDiff);
        startBtn.innerHTML = "Start";
        pausedBtnOff = true;
    }
});

resetBtn.addEventListener('click', () => {
    hour = 0, minute = 0, second = 0, millisecond = 0;
    displayUI();
    clearInterval(swInterval);
    pausedBtnOff = true;
    startBtn.innerHTML = "Start";
    stopTimeDiff = 0;
    tempTime = 0;
});

function displayUI(){
    _hour.innerHTML = checkZero(hour, 2);
    _minute.innerHTML = checkZero(minute, 2);
    _second.innerHTML = checkZero(second, 2);
    _millisecond.innerHTML = checkZero(millisecond, 3);
}

displayUI();

function stopwatch(startTime){
    swInterval = setInterval(() => {
        let intervalTime = Date.now();
        let ms = intervalTime - (startTime - tempTime);
        stopTimeDiff = ms;
        timeConversion(ms);
    }, 1);
}

function timeConversion(ms){
    _millisecond.innerHTML = checkZero(ms % 1000, 3);
    second = Math.floor((ms / 1000) % 60);
    _second.innerHTML = checkZero(second, 2);
    minute = Math.floor((ms / (1000 * 60)) % 60);
    _minute.innerHTML = checkZero(minute, 2);
    hour = Math.floor((ms / (1000 * 60 * 60)) % 24);
    _hour.innerHTML = checkZero(hour, 2);
}

function checkZero(timeVal, countOfZero){
    if(timeVal < 10 && countOfZero == 2){
        timeVal = '0' + timeVal;
    }
    if(timeVal < 100 && countOfZero == 3){
        if(timeVal < 10){
            timeVal = '00' + timeVal;
            return timeVal;
        }
        timeVal = '0' + timeVal;
    }
    return timeVal;
}
