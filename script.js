/* -----------------------------
      DIGITAL CLOCK
------------------------------*/
const digitalTime = document.getElementById("digitalTime");
const dateStr = document.getElementById("dateStr");
const tzName = document.getElementById("tzName");
const offsetStr = document.getElementById("offsetStr");

function updateClock() {
  const now = new Date();

  // 24H toggle
  const is24 = document.getElementById("hourToggle").checked;

  let hours = now.getHours();
  let mins = now.getMinutes();
  let secs = now.getSeconds();

  let displayHours = is24 ? hours : (hours % 12 || 12);
  let suffix = is24 ? "" : hours >= 12 ? " PM" : " AM";

  digitalTime.textContent =
    `${String(displayHours).padStart(2, "0")}:` +
    `${String(mins).padStart(2, "0")}:` +
    `${String(secs).padStart(2, "0")}${suffix}`;

  dateStr.textContent = now.toDateString();
  tzName.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
  offsetStr.textContent = "UTC " + (now.getTimezoneOffset() / -60);
}

setInterval(updateClock, 500);
updateClock();

/* -----------------------------
      ANALOG CLOCK
------------------------------*/
const hHand = document.getElementById("hHand");
const mHand = document.getElementById("mHand");
const sHand = document.getElementById("sHand");

function updateAnalog() {
  const now = new Date();
  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();

  hHand.style.transform = `translateX(-50%) rotate(${h * 30 + m * 0.5}deg)`;
  mHand.style.transform = `translateX(-50%) rotate(${m * 6}deg)`;
  sHand.style.transform = `translateX(-50%) rotate(${s * 6}deg)`;
}

setInterval(updateAnalog, 500);
updateAnalog();

/* -----------------------------
      THEME TOGGLE
------------------------------*/
document.getElementById("themeToggle").addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
});

/* -----------------------------
      ACCENT COLOR PICKER
------------------------------*/
document.getElementById("accentPicker").addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--accent", e.target.value);
  document.documentElement.style.setProperty("--glow", e.target.value + "88");
});

/* -----------------------------
      COUNTDOWN TIMER
------------------------------*/
const countdownDisplay = document.getElementById("countdown");
const durationInput = document.getElementById("durationInput");
const dateInput = document.getElementById("dateInput");

let timerInterval = null;
let remainingSeconds = 0;

function formatTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return (
    String(h).padStart(2, "0") +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0")
  );
}

function startTimer() {
  if (dateInput.value) {
    // Use target date/time
    const target = new Date(dateInput.value);
    remainingSeconds = Math.floor((target - new Date()) / 1000);
  } else {
    // Parse duration input
    const parts = durationInput.value.split(":").map(Number);
    if (parts.length === 3) {
      remainingSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      remainingSeconds = parts[0] * 60 + parts[1];
    } else {
      remainingSeconds = Number(durationInput.value);
    }
  }

  if (remainingSeconds <= 0) {
    alert("Invalid duration or date.");
    return;
  }

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      countdownDisplay.textContent = "00:00:00";

      if (document.getElementById("soundToggle").checked) {
        new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg").play();
      }
      return;
    }

    countdownDisplay.textContent = formatTime(remainingSeconds);
    remainingSeconds--;
  }, 1000);
}

document.getElementById("startBtn").onclick = startTimer;

document.getElementById("pauseBtn").onclick = () => {
  clearInterval(timerInterval);
};

document.getElementById("resetBtn").onclick = () => {
  clearInterval(timerInterval);
  remainingSeconds = 0;
  countdownDisplay.textContent = "--:--:--";
};

/* Quick Presets */
document.getElementById("preset1").onclick = () => (durationInput.value = "00:01:00");
document.getElementById("preset5").onclick = () => (durationInput.value = "00:05:00");
document.getElementById("preset10").onclick = () => (durationInput.value = "00:10:00");
document.getElementById("preset60").onclick = () => (durationInput.value = "01:00:00");

/* Speed Adjust */
document.getElementById("minus10").onclick = () => {
  remainingSeconds = Math.max(remainingSeconds - 10, 0);
};
document.getElementById("plus10").onclick = () => {
  remainingSeconds += 10;
};
