class Stopwatch {
    constructor(startBtn, stopBtn, resetBtn, milliseconds, seconds, minutes, lapBtn, timeDisplay, allLaps) {
        this.startBtn = startBtn;
        this.stopBtn = stopBtn;
        this.resetBtn = resetBtn;
        this.lapBtn = lapBtn;
        this.milliseconds = milliseconds;
        this.seconds = seconds;
        this.minutes = minutes;
        this.timeDisplay = timeDisplay;
        this.allLaps = allLaps;

        this.lapSeconds = 0;
        this.lapMinutes = 0;
        this.lapCount = 0;
        this.laps = [];
        this.previousLap = 0;
        this.currentLap = 0;

        startBtn.addEventListener('click', this.start);
        stopBtn.addEventListener('click', this.stop);
        resetBtn.addEventListener('click', this.reset);
        lapBtn.addEventListener('click', this.lap);
    };
    start = () => {
        this.startBtn.disabled = true;
        this.timeDisplay.classList.add('start-time');
        this.timeDisplay.classList.remove('stop-time');
        this.tick();
        this.increment = setInterval(this.tick, 10);
    };
    stop = () => {
        this.timeDisplay.classList.remove('start-time');
        this.timeDisplay.classList.add('stop-time');
        clearInterval(this.increment);
        this.startBtn.disabled = false;
    };
    reset = () => {
        this.timeDisplay.classList.remove('start-time');
        this.stop();
        this.timeDisplay.classList.remove('stop-time');
        this.startBtn.disabled = false;
        this.milliseconds.innerText = '00';
        this.seconds.innerText = '00';
        this.minutes.innerText = '00';
        this.lapSeconds = 0;
        this.lapCount = 0;
        for (let lap of this.laps) {
            lap.remove();
        };
        this.previousLap = 0;
        this.currentLap = 0;
    };
    tick = () => {
        this.lapSeconds = this.lapSeconds + 1;
        this.updateMilliseconds();
    };
    updateMilliseconds = () => {
        let updateMilliseconds = parseFloat(this.milliseconds.innerText) + 1;
        if (updateMilliseconds < 10) {
            this.milliseconds.innerText = `0${updateMilliseconds}`;
        }   else if (updateMilliseconds === 100) {
            this.updateSeconds();
            updateMilliseconds = 0;
            this.milliseconds.innerText = `0${updateMilliseconds}`;
        }   else {
            this.milliseconds.innerText = updateMilliseconds;
        };
    };
    updateSeconds = () => {
        this.plusOne(this.seconds);
    };
    updateMinutes = () => {
        this.plusOne(this.minutes);
    };
    plusOne = (timeValue) => {
        let updateValue = parseInt(timeValue.innerText);
        if (timeValue.innerText < 59) {
            if (timeValue.innerText < 9) {
                timeValue.innerText = `0${updateValue + 1}`;
            }   else {
                timeValue.innerText = updateValue + 1;
            };
        }   else {
            timeValue.innerText = '00';
            this.updateMinutes();
        };
    };
    lap = () => {
        if (this.lapSeconds != 0 || this.lapMinutes != 0) {
            this.currentLap = this.lapSeconds // clipboard goes here
            this.lapCount = this.lapCount + 1;
            const lapElement = document.createElement('h5');
            this.addLap(lapElement);
            this.compareLaps(lapElement);
            this.allLaps.prepend(lapElement);
            this.laps.push(lapElement);
            this.lapSeconds = 0;
            this.lapMinutes = 0;
        }
    };
    addLap = (lapElement) => {
        if (this.lapSeconds >= 6000) {
            let lapMinutes = parseInt(this.lapSeconds / 6000);
            if (this.lapSeconds / 100 % 60 < 10) {
                lapElement.innerHTML = `Lap ${this.lapCount} Time: <span id='lap-time'>${lapMinutes}:0${(this.lapSeconds / 100 % 60).toFixed(2)}</span>`;
            }   else {
                lapElement.innerHTML = `Lap ${this.lapCount} Time: <span id='lap-time'>${lapMinutes}:${(this.lapSeconds / 100 % 60).toFixed(2)}</span>`;
            } 
        }   else {
            if (this.lapSeconds / 100 % 60 < 10) {
                lapElement.innerHTML = `Lap ${this.lapCount} Time: <span id='lap-time'>00:0${this.lapSeconds / 100}</span>`;
            }   else {
                lapElement.innerHTML = `Lap ${this.lapCount} Time: <span id='lap-time'>00:${this.lapSeconds / 100}</span>`;
            };
        };
    };
    compareLaps = (lapElement) => {
        if (this.currentLap < this.previousLap) {
            lapElement.classList.add('winner');
        }   else {
            lapElement.classList.add('loser');
        }
        this.previousLap = this.currentLap;
    };
};