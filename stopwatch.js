let startTime;
let updatedTime;
let difference;
let t;
let running = false;
let lapCount = 0;

const stopwatchDisplay = document.getElementById('stopwatch');
const lapsList = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        t = setInterval(getShowTime, 1);
        running = true;
    }
}

function stopTimer() {
    clearInterval(t);
    running = false;
}

function resetTimer() {
    clearInterval(t);
    running = false;
    stopwatchDisplay.innerHTML = "00:00:00:000";
    difference = 0;
    lapsList.innerHTML = '';  // Clear laps
    lapCount = 0;  // Reset lap count
}

function lapTimer() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const formattedTime = formatTime(difference);
    stopwatchDisplay.innerHTML = formattedTime;
}

function formatTime(time) {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000));

    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + ":" +
        (milliseconds < 100 ? "0" + milliseconds : milliseconds)
    );
}

// Event Listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', lapTimer);
