import React, {useState} from 'react';

function refreshTime() {
  const time = new Date().toLocaleTimeString();
  return time;
}

function RealtimeClock() {
  const [time, setTime] = useState(refreshTime());
  setTimeout(() => setTime(refreshTime()), 1000);
  return <p className='h-fit'>{time}</p>;
}

export default RealtimeClock;
