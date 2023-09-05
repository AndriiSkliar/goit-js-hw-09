import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector("#datetime-picker"),
  btnStart: document.querySelector("button"),
  daysOnBanner: document.querySelector(".value[data-days]"),
  hoursOnBanner: document.querySelector(".value[data-hours]"),
  minutesOnBanner: document.querySelector(".value[data-minutes]"),
  secondsOnBanner: document.querySelector(".value[data-seconds]"),
}
const { input, btnStart, daysOnBanner, hoursOnBanner, minutesOnBanner, secondsOnBanner } = refs;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < this.config.defaultDate) {
      Notify.failure("Please choose a date in the future");
    } else {
      btnStart.disabled = false;
    }},
};

flatpickr(input, options);

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

btnStart.addEventListener("click", onClick);

function onClick() {
  Notify.success("Timer started!");
  input.disabled = true;
  btnStart.disabled = true;

  const intervalId = setInterval(() => {
    const inputValue = new Date(input.value);
    const currentTime = new Date();
    const { days, hours, minutes, seconds } = convertMs(inputValue - currentTime);

    if (inputValue <= currentTime) {
      clearInterval(intervalId);
      input.disabled = false;
    } else {
      addLeadingZero(days, hours, minutes, seconds);
    }
  }, 1000);
}

function addLeadingZero(days, hours, minutes, seconds) {
  daysOnBanner.textContent = `${days}`.padStart(2, "0");
  hoursOnBanner.textContent = `${hours}`.padStart(2, "0");
  minutesOnBanner.textContent = `${minutes}`.padStart(2, "0");
  secondsOnBanner.textContent = `${seconds}`.padStart(2, "0");
}