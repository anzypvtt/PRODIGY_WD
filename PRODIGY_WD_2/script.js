let timer;
let elapsedTime = 0; // in milliseconds
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateDisplay() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    const format = (num) => num.toString().padStart(2, '0');
    display.textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    const startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = ''; // Clear laps
}

function recordLap() {
    if (!isRunning) return;
    lapCounter++;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const lapTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(li);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
