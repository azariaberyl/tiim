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

class Time {
  minute: number;
  second: number;
  total: number;

  constructor(minute: number = 0, second?: number) {
    this.total = second ? second + minute * 60 : minute;
    this.second = second ? second : this.total;
    this.minute = minute;
  }

  toString(): string {
    return `${this.minute.toString().padStart(2, '0')}:${this.second
      .toString()
      .padStart(2, '0')}`;
  }

  reduceTime(second: number): void {
    this.reduceTimeFunction(second);
    this.total = this.second + this.minute * 60;
  }

  reduceTimeFunction(second: number) {
    if (this.minute === 0) {
      this.second -= second;
      if (this.second <= 0) {
        this.second = 0;
        return;
      }
      return;
    }

    this.second -= second;
    while (this.second < 0) {
      this.minute--;
      this.second = 60 - this.second;
    }
  }
}

export { toMilliseconds, Time, toSeconds, secondToString };
