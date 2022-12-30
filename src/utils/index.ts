const toMilliseconds = (hrs: number = 0, min: number = 0, sec: number = 0) =>
  (hrs * 60 * 60 + min * 60 + sec) * 1000;

const toSeconds = (min: number = 0, sec: number = 0) => min * 60 + sec;

const secondToString = (sec: number) => {
  let minutes: number = 0;
  let second: number = sec;
  for (second; second >= 60; second -= 60) {
    minutes++;
  }
  return `${minutes.toString().padStart(2, '0')}:${second
    .toString()
    .padStart(2, '0')}`;
};

export { toMilliseconds, toSeconds, secondToString };
