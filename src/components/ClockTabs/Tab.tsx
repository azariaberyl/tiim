import React, { memo, useCallback } from 'react';
import useTabStore from '../../contexts/TabStore';
import { tab } from '../../types';
import useTimerStore from '../../contexts/TimerStore';
import TabButton from './TabButton';
import useTimerBreakStore from '../../contexts/TimeBreakStore';

interface props {
  id: tab;
  name: string;
}

function Tab({ id, name }: props) {
  const { onChangeTab, tab } = useTabStore();
  const [onStartChange, isStart] = useTimerStore((s) => [s.onStartChange, s.isStart]);
  const isCurrentTab = tab === id;

  // Create diffettent function bellow

  const onClick = () => {
    if (!isCurrentTab) {
      onChangeTab(id);
      onStartChange(false);
      document.title = 'Pomodoro Timer';
    }
  };

  return (
    <TabButton isCurrentTab={isCurrentTab} isStart={isStart} onClick={onClick}>
      {name}
    </TabButton>
  );
}

export default memo(Tab);
