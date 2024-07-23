const startBnt = document.querySelector('button[data-start]');
const stopBnt = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startBnt.addEventListener('click', onOpenBtnClick);
stopBnt.addEventListener('click', onCloseBtnClick);

let intervalId = null;

function onOpenBtnClick(evt) {
  intervalId = setInterval(() => {
    setBgColor();
    startBnt.disabled = true;
  }, 1000);
}

function onCloseBtnClick(evt) {
  clearInterval(intervalId);
  startBnt.disabled = false;
}

function setBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
