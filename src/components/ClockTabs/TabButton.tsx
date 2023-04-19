import React from 'react';

function DisabledButton({ children, isCurrentTab }: { children: React.ReactNode; isCurrentTab: boolean }) {
  return (
    <button
      disabled
      className={`px-4 py-1 font-bold text-white/50 bg-default-light/20 hover:cursor-not-allowed ${
        isCurrentTab && 'text-white bg-default-light/40'
      }`}
    >
      {children}
    </button>
  );
}

interface props {
  isStart: boolean;
  isCurrentTab: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

function TabButton({ children, isCurrentTab, isStart, onClick }: props) {
  if (!isStart) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-1 font-bold text-white/90 bg-default-light/20 hover:bg-default-light/40 hover:text-white rounded ${
          isCurrentTab && 'text-white bg-default-light/40'
        }`}
      >
        {children}
      </button>
    );
  }
  return <DisabledButton isCurrentTab={isCurrentTab}>{children}</DisabledButton>;
}

export default TabButton;
