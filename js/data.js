function getTimeRemaining(endtime) {
  const distance = Date.parse(endtime) - Date.parse(new Date());
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    total: distance,
    days,
    hours,
    minutes,
    seconds
  };
}

const padZero = num => (num >= 0 && num < 10 ? '0' : '') + num.toString(10);

function setClock(selector, endtime) {
  const timer = document.querySelector(selector);
  const days = timer.querySelector(`[data-value="days"]`);
  const hours = timer.querySelector(`[data-value="hours"]`);
  const minutes = timer.querySelector(`[data-value="mins"]`);
  const seconds = timer.querySelector(`[data-value="secs"]`);
  const timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function updateClock() {
    const t = getTimeRemaining(endtime);

    days.innerHTML = padZero(t.days);
    hours.innerHTML = padZero(t.hours);
    minutes.innerHTML = padZero(t.minutes);
    seconds.innerHTML = padZero(t.seconds);

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }
}
