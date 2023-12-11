// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, set, update } from 'firebase/database';
import { Timer1 } from '../types/timer';
// https://firebase.google.com/docs/web/setup#available-libraries

interface TimerReport {
  date: string;
  report: number;
}

// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL: 'https://tiimz-9e1f4-default-rtdb.asia-southeast1.firebasedatabase.app/',
  apiKey: 'AIzaSyATzHS0YYOoUIK_m2Egi55IWkVKva0HjGg',
  authDomain: 'tiimz-9e1f4.firebaseapp.com',
  projectId: 'tiimz-9e1f4',
  storageBucket: 'tiimz-9e1f4.appspot.com',
  messagingSenderId: '585832223917',
  appId: '1:585832223917:web:43edafef2db3626abb2224',
};

// Initialize Firebase
export const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);

export function writeTimers(userId: string | undefined, timers: Timer1[]) {
  if (userId === undefined) return;
  const db = getDatabase();
  set(ref(db, userId + '/timers'), timers);
}
export function updateReportFirebase(userId: string | undefined, report: TimerReport | undefined, id_timer: string) {
  if (userId === undefined) return;
  if (report === undefined) return;

  const datePath = report.date.replaceAll('/', '-');
  const idTimer = id_timer.replaceAll('.', '-').replaceAll(':', '-');
  const db = getDatabase();
  set(ref(db, `${userId}/${idTimer}/${datePath}`), report.report);
}

export function updateActiveTimerIdFirebase(userId: string | undefined, activeTimerId: string) {
  if (userId === undefined) return;
  const db = getDatabase();
  set(ref(db, `${userId}/activeTimerId`), activeTimerId);
}

export function deleteTimerFirebase(
  userId: string | undefined,
  removedId: string,
  activeTimerId: string,
  timers: Timer1[]
) {
  if (userId === undefined) return;
  const db = getDatabase();
  const removedIdFormated = removedId.replaceAll(':', '-').replaceAll('.', '-');
  const updates: any = {};
  updates[`${userId}/timers`] = timers; // Delete timer
  updates[`${userId}/activeTimerId`] = activeTimerId; // Change activeTimerId
  updates[`${userId}/${removedIdFormated}`] = null; // Delete report
  return update(ref(db), updates);
}

export default app;
