// Project #1: Stopwatch

const stopWatch = document.querySelector('#project-1');
const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')
const resetBtn = document.querySelector('#reset')
const lapBtn = document.querySelector('#lap');
const milliseconds = document.querySelector('#milliseconds');
const seconds = document.querySelector('#seconds');
const minutes = document.querySelector('#minutes');
const allLaps = document.querySelector('#stopwatch-laps');
const timeDisplay = document.querySelector('#time-display');

const stopwatch1 = new Stopwatch(startBtn, stopBtn, resetBtn, milliseconds, seconds, minutes, lapBtn, timeDisplay, allLaps);



