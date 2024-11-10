// Timer settings for each mode
const modes = {
  pomodoro: 25 * 60,
  "short-break": 5 * 60,
  "long-break": 15 * 60
};

let timer;
let timeRemaining = modes["pomodoro"];
let isRunning = false;
let isPaused = false;

// Function to display time in minutes and seconds
function displayTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  document.getElementById("timer").textContent =
    `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Update button states
function updateButtonStates() {
  document.getElementById("startBtn").disabled = isRunning || isPaused;
  document.getElementById("pauseBtn").textContent = isRunning ? "pause" : "continue";
}

// Event listeners for mode selection
document.querySelectorAll(".mode").forEach((mode) => {
  mode.addEventListener("change", function () {
    clearInterval(timer);
    timeRemaining = modes[this.id];
    isRunning = false;
    isPaused = false;
    updateButtonStates();
    displayTime(timeRemaining);
  });
});

// Start timer
document.getElementById("startBtn").addEventListener("click", () => {
  if (!isRunning && !isPaused) {
    timer = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        displayTime(timeRemaining);
      } else {
        clearInterval(timer);
        alert("Time's up!");
      }
    }, 1000);
    isRunning = true;
    updateButtonStates();
  }
});

// Pause/Continue timer
document.getElementById("pauseBtn").addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    isPaused = true;
  } else if (isPaused) {
    timer = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        displayTime(timeRemaining);
      } else {
        clearInterval(timer);
        alert("time's up!");
      }
    }, 1000);
    isRunning = true;
    isPaused = false;
  }
  updateButtonStates();
});

// End timer
document.getElementById("endBtn").addEventListener("click", () => {
  clearInterval(timer);
  timeRemaining = modes[document.querySelector(".mode:checked").id];
  isRunning = false;
  isPaused = false;
  updateButtonStates();
  displayTime(timeRemaining);
});

document.getElementById('toggleSpotify').addEventListener('click', function () {
  const spotify = document.querySelector('.spotify');
  if (spotify.style.maxHeight) {
    spotify.style.maxHeight = null;
    this.textContent = "–";
  } else {
    spotify.style.maxHeight = "0";
    this.textContent = "+";
  }
});

// Initialize timer display and button states
displayTime(timeRemaining);
updateButtonStates();
