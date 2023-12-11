import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Tiimz } from './pages';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { init1 } from './utils';
import { changeTimerId, changeTimerReports, changeTimers, updateUser } from './features/dataSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { changeSecond, changeTimer, changeTimerReport } from './features/timerSlice';
import { child, get, getDatabase, ref } from 'firebase/database';
import { Timer1 } from './types/timer';
import { Report } from './types';

export default function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.data.user);

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

  useEffect(() => {
    const dbRef = ref(getDatabase());
    if (user) {
      get(child(dbRef, `${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Update dataSlice
            const { activeTimerId, timers, ...timerReports } = snapshot.val();
            dispatch(changeTimerId(activeTimerId || '-1'));
            dispatch(
              changeTimers(
                timers || [
                  {
                    id: '-1',
                    longBreak: 600,
                    seconds: 1500,
                    shortBreak: 300,
                    title: 'My Project',
                  },
                ]
              )
            );
            if (Object.keys(timerReports).length !== 0) {
              const reports = [];
              for (const key in timerReports) {
                if (Object.prototype.hasOwnProperty.call(timerReports, key)) {
                  const dates = Object.keys(timerReports[key]);
                  const reportValue = dates.map((date) => {
                    const formatedDate = date.replaceAll('-', '/');
                    return { date: formatedDate, report: timerReports[key][date] };
                  });
                  const element = { id_timer: key, reports: reportValue };
                  reports.push(element);
                }
              }
              if (reports.length !== 0) dispatch(changeTimerReports(reports));
            }
            // Update timerSlice
            const timer = timers
              ? timers.find((val: Timer1) => val.id == activeTimerId || '-1')
              : { id: '-1', longBreak: 600, seconds: 1500, shortBreak: 300, title: 'My Project' };
            console.log('timer', timer);
            dispatch(changeTimer(timer));
          } else {
            dispatch(changeTimerId('-1'));
            dispatch(
              changeTimers([
                {
                  id: '-1',
                  longBreak: 600,
                  seconds: 1500,
                  shortBreak: 300,
                  title: 'My Project',
                },
              ])
            );
            dispatch(
              changeTimer({
                id: '-1',
                longBreak: 600,
                seconds: 1500,
                shortBreak: 300,
                title: 'My Project',
              })
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

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
