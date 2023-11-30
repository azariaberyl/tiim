import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeTab } from '../../../features/timerSlice';

interface tabProps {
  id: 1 | 2 | 3;
  name: string;
}

function Tab({ id, name }: tabProps) {
  const tab = useAppSelector((state) => state.timer.tab);
  const isStart = useAppSelector((state) => state.timer.start);
  const dispatch = useAppDispatch();

  const isCurrentTab = tab === id;

  return (
    <TabButton isCurrentTab={isCurrentTab} isStart={isStart} onClick={() => dispatch(changeTab(id))}>
      {name}
    </TabButton>
  );
}

interface btnProps {
  isStart: boolean;
  isCurrentTab: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

function TabButton({ children, isCurrentTab, isStart, onClick }: btnProps) {
  if (!isStart) {
    return (
      <button
        data-test='timer-tab'
        onClick={onClick}
        className={`md:text-base text-sm tracking px-4 md:py-1 py-2 font-bold text-white/90 bg-default-light/20 hover:bg-default-light/40 hover:text-white rounded ${
          isCurrentTab && 'text-white bg-default-light/40'
        }`}
      >
        {children}
      </button>
    );
  }
  return <DisabledButton isCurrentTab={isCurrentTab}>{children}</DisabledButton>;
}

function DisabledButton({ children, isCurrentTab }: { children: React.ReactNode; isCurrentTab: boolean }) {
  return (
    <button
      disabled
      className={`px-4 py-1 font-bold text-white/50 bg-default-light/20 hover:cursor-not-allowed rounded ${
        isCurrentTab && 'text-white bg-default-light/40'
      }`}
    >
      {children}
    </button>
  );
}

export default memo(Tab);
