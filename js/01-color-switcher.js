const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
const body = document.querySelector("body")
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

btnStart.addEventListener("click", onStart);
btnStop.addEventListener("click", onStop);

function onStart() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    btnStart.disabled = true;
    btnStop.removeAttribute('disabled');
  }, 1000);
}

function onStop() {
  clearInterval(timerId);
  btnStop.disabled = true;
  btnStart.removeAttribute('disabled');
}
