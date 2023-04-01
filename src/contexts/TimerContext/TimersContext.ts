import React, { createContext, useDebugValue } from 'react';

const TimersContext = createContext({
  report: 0,
  onRefresh: undefined,
  timer: {category: '', minutes: 0, seconds: 0, title: ''},
});

export default TimersContext;
