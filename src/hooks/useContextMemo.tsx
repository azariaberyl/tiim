import React, { useContext, useMemo, useState } from 'react';
import TimersContext from '../contexts/TimerContext/TimersContext';

function useContextMemo<T>(context: React.Context<T>) {
  const data = useMemo(() => useContext(context), []);

  return data;
}

export default useContextMemo;
