import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tiimz } from './pages';
import useUserStore from './contexts/UserStore';
import { useAppDispatch } from './app/hooks';
import { init, init1 } from './utils';
import { changeTimerId, changeTimerReports, changeTimers } from './features/dataSlice';
import { changeSecond, changeTimer, changeTimerReport } from './features/timerSlice';

// TODO: Create initialize data when the app started

function App() {
  const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const { activeTimerId, timerReports, timers } = init();
    const { activeTimerId, timerReports, timers, timerSecondState } = init1();
    // Update the data
    dispatch(changeTimerId(activeTimerId));
    dispatch(changeTimerReports(timerReports));
    dispatch(changeTimers(timers));
    // Update the timer
    const theTimer = timers?.find((val) => val.id === activeTimerId) || {
      id: '-1',
      longBreak: 600,
      seconds: 1500,
      shortBreak: 300,
      title: 'My Project',
    };
    const theReports = timerReports?.find((val) => val.id_timer === activeTimerId)?.reports;
    const theReport = theReports?.find((val) => val.date === new Date().toLocaleDateString());
    dispatch(changeTimer(theTimer));
    dispatch(changeTimerReport(theReport));
    dispatch(changeSecond(timerSecondState));
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Tiimz />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default App;
