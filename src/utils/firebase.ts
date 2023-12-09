// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { Timer1 } from '../types/timer';
// https://firebase.google.com/docs/web/setup#available-libraries

interface TimerReport {
  date: string;
  report: number;
}

// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL: 'https://DATABASE_NAME.REGION.firebasedatabase.app',
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

// TODO: Test the functions

export function writeTimers(userId: string, timers: Timer1[]) {
  const db = getDatabase();
  set(ref(db, userId + '/timers'), timers);
}
export function updateReportFirebase(userId: string | undefined, report: TimerReport | undefined, id_timer: string) {
  if (userId === undefined) return;
  if (report === undefined) return;
  const datePath = report.date.replaceAll('/', '-');
  const db = getDatabase();
  set(ref(db, `${userId}/${id_timer}/${datePath}`), report.report);
}
