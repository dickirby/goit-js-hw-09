import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let distance;
let convertedSelectedTime;
let convertedNowTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    convertedSelectedTime = selectedDates[0].getTime();
    convertedNowTime = options.defaultDate.getTime();
    distance = convertedSelectedTime - new Date();

    setInterval(() => {
      this.defaultDate = new Date();
    }, 1000);

    if (convertedSelectedTime <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    startBtn.disabled = false;
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer() {
  const converted = convertMs(distance);
  const timerFields = ['days', 'hours', 'minutes', 'seconds'];

  timerFields.forEach(field => {
    const element = document.querySelector(`.timer [data-${field}]`);
    element.textContent = converted[field].toString().padStart(2, '0');
  });

  distance -= 1000;
  if (distance <= 0) {
    clearInterval(interval);
    Notiflix.Notify.success('Timer finish');
  }
}

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

let interval;
startBtn.addEventListener('click', () => {
  interval = setInterval(updateTimer, 1000);
  startBtn.disabled = true;
});

const timer = document.querySelector('.timer');

flatpickr('#datetime-picker', options);
