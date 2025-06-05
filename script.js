function updateClock() {
  const now = new Date();
const time = now.toLocaleTimeString('en-GB', { hour12: false }) + '.' + String(now.getMilliseconds()).padStart(3, '0');
  const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const clockElem = document.getElementById("currentTime");
  if (clockElem) {
    clockElem.innerText = `${date} ${time}`;
  }
}
setInterval(updateClock, 1000);

let stopwatchInterval;
let elapsedSeconds = 0;
let laps = [];

function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateStopwatchDisplay() {
  const display = document.getElementById("stopwatchDisplay");
  if (display) display.innerText = formatTime(elapsedSeconds);
}

function updateLapsDisplay() {
  const lapsList = document.getElementById("lapsList");
  if (lapsList) {
    lapsList.innerHTML = '';
    laps.forEach((lap, idx) => {
      const li = document.createElement('li');
      li.textContent = `Lap ${idx + 1}: ${formatTime(lap)}`;
      lapsList.appendChild(li);
    });
  }
}

function startStopwatch() {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      elapsedSeconds++;
      updateStopwatchDisplay();
    }, 1000);
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  elapsedSeconds = 0;
  laps = [];
  updateStopwatchDisplay();
  updateLapsDisplay();
}

function lapStopwatch() {
  laps.push(elapsedSeconds);
  updateLapsDisplay();
}


document.getElementById("startBtn")?.addEventListener("click", startStopwatch);
document.getElementById("stopBtn")?.addEventListener("click", stopStopwatch);
document.getElementById("resetBtn")?.addEventListener("click", resetStopwatch);
document.getElementById("lapBtn")?.addEventListener("click", lapStopwatch);


updateClock();
updateStopwatchDisplay();
updateLapsDisplay();