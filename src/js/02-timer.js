// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

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

const calendar = flatpickr(refs.colorPiecker, {
  minDate: Date.now() + 2 * 60 * 1000,
  enableTime: true,
  //   enableSeconds: true,
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
        alert('No time left😜');
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
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (ms - days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000)
  );
  const mins = Math.floor(
    (ms - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) / (60 * 1000)
  );
  const secs = Math.floor(
    (ms -
      days * 24 * 60 * 60 * 1000 -
      hours * 60 * 60 * 1000 -
      mins * 60 * 1000) /
      1000
  );

  return { days, hours, mins, secs };
}
