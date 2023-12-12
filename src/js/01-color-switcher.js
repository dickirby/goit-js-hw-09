function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timer = null;
startBtn.addEventListener('click', changeBg);
stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

function changeBg() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timer = setInterval(() => {
    document.body.style.background = '#' + getRandomHexColor;
    console.log((document.body.style.background = getRandomHexColor()));
  }, 1000);
}
