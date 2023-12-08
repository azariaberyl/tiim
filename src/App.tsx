import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tiimz } from './pages';
import { useAppDispatch } from './app/hooks';
import { init1 } from './utils';
import { changeTimerId, changeTimerReports, changeTimers, updateUser } from './features/dataSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { changeSecond, changeTimer, changeTimerReport } from './features/timerSlice';

function App() {
  const dispatch = useAppDispatch();

  // Init from Firebase
  useEffect(() => {
    // Init user
    const auth = getAuth();
    const login = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        dispatch(updateUser(user));
      } else {
        // User is signed out
        dispatch(updateUser(null));
      }
    });

    return () => login();
  }, []);

  // Init data from local storage
  useEffect(() => {
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
