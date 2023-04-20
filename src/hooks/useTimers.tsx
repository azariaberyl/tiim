import React, { useEffect } from 'react';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import { fetchSelectedTimer, fetchTimers } from '../utils/timer';
import useTimerStore from '../contexts/TimerStore';
import { DEFAULT_TIMER } from '../utils/constants';

function useTimers() {
  const timers = useTimerColectionStore((s) => s.timers);
  const onTimerChange = useTimerStore((s) => s.onTimerChange);
  const onColectionChange = useTimerColectionStore((s) => s.onChange);

  useEffect(() => {
    async function init() {
      const data = await fetchTimers();
      const selected = await fetchSelectedTimer();
      onColectionChange('timers', data);
      onTimerChange(data.find((t) => t.id == selected) || DEFAULT_TIMER);
    }

    init();
  }, []);

  return timers;
}

export default useTimers;
