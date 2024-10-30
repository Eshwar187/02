let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

// Function to update the display with the current time
function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Function to format time in hh:mm:ss:ms format
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Start the timer
startButton.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
});

// Pause the timer
pauseButton.addEventListener('click', () => {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
});

// Reset the timer
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    display.textContent = '00:00:00:00';
    lapsContainer.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
});

// Record a lap time
lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = document.createElement('div');
        lapTime.classList.add('lap-time');
        lapTime.textContent = formatTime(elapsedTime);
        lapsContainer.appendChild(lapTime);
    }
});
