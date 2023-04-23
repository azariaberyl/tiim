import React, { useEffect } from 'react';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import { fetchSelectedTimer, fetchTimers } from '../utils/timer';
import useTimerStore from '../contexts/TimerStore';
import { DEFAULT_TIMER } from '../utils/constants';

/**
 * function that fetches initial TimersColection from cloud
 * and return the Timers
 */
function useTimers() {
  const timers = useTimerColectionStore((s) => s.timers);
  const onTimerChange = useTimerStore((s) => s.onTimerChange);
  const onColectionChange = useTimerColectionStore((s) => s.onChange);

  useEffect(() => {
    async function init() {
      const data = await fetchTimers();
      const selected = await fetchSelectedTimer();
      // console.log(data, selected);
      onColectionChange('timers', data); // Update timers
      onColectionChange('selected', selected || data[0].id); // Update selected
      onTimerChange(data.find((t) => t.id == selected) || data[0]);
    }

    init();
  }, []);

  return timers;
}

export default useTimers;
