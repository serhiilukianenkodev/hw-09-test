import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';
import '../css/timer.css';

const refs = {
  colorPiecker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  fieldDays: document.querySelector('span[data-days]'),
  fieldHours: document.querySelector('span[data-hours]'),
  fieldMinutes: document.querySelector('span[data-minutes]'),
  fieldSeconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
refs.stopBtn.disabled = true;

const notifyOptions = {
  timeout: 5000,
  position: 'center-top',
  fontSize: '24px',
  width: '360px',
};

Notify.warning('Pick pade before starting', notifyOptions);

const calendar = flatpickr(refs.colorPiecker, {
  minDate: Date.now() + 2 * 60 * 1000,
  defaultDate: Date.now() + 2 * 60 * 1000,
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
});
let intervalId = null;

function onStartBtnClick() {
  const selectedDate = calendar.selectedDates[0];

  if (selectedDate) {
    blockStartKey(true);

    intervalId = setInterval(() => {
      const deltaTime = selectedDate - Date.now();
      if (deltaTime <= 0) {
        clearInterval(intervalId);
        fillTime();
        blockStartKey(false);
        Notify.failure('No time left😜', notifyOptions);
        // alert('No time left😜');
        return;
      }
      fillTime(splitTime(deltaTime));
    }, 1000);
  }
}

function blockStartKey(block = true) {
  refs.startBtn.disabled = block;
  refs.stopBtn.disabled = !block;
  refs.colorPiecker.disabled = block;
}

function onStopBtnClick() {
  clearInterval(intervalId);
  fillTime();
  blockStartKey(false);
}

function fillTime({ days = 0, hours = 0, mins = 0, secs = 0 } = {}) {
  refs.fieldDays.textContent = String(days).padStart(2, '0');
  refs.fieldHours.textContent = String(hours).padStart(2, '0');
  refs.fieldMinutes.textContent = String(mins).padStart(2, '0');
  refs.fieldSeconds.textContent = String(secs).padStart(2, '0');
}

function splitTime(ms) {
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const min = 60 * 1000;
  const sec = 1000;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const mins = Math.floor((ms % hour) / min);
  const secs = Math.floor((ms % min) / sec);

  return { days, hours, mins, secs };
}
