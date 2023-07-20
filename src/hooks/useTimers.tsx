import { useEffect } from 'react';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import {
  fetchInterval,
  fetchReports,
  fetchSelectedTimer,
  fetchTimers,
  postReportsFirebase,
  postSelectedFirebase,
  postTimers,
  postTimersFirebase,
} from '../utils/timer';
import useTimerStore from '../contexts/TimerStore';
import useReportStore from '../contexts/ReportStore';
import { findValueBasedOnId } from '../utils';
import { Reports } from '../types';
import useIntervalStore from '../contexts/IntervalStore';
import { DEFAULT_REPORT, DEFAULT_TIMER, TODAY_STRING_DATE } from '../utils/constants';
import useUserStore from '../contexts/UserStore';
import { child, get, getDatabase, ref } from 'firebase/database';
import { FetchedData, Timer } from '../types/timer';

/**
 * function that fetches initial TimersColection from cloud
 * and return the Timers
 */
function useTimers() {
  const timers = useTimerColectionStore((s) => s.timers);
  const onTimerChange = useTimerStore((s) => s.onTimerChange);
  const onReportChange1 = useReportStore((s) => s.reportChange1);
  const onColectionChange = useTimerColectionStore((s) => s.onChange);
  const updateInterval = useIntervalStore((s) => s.updateInterval);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    function init() {
      try {
        let newTimers: Timer[] | null = [];
        let newReports: Reports | null = [];
        let newSelected: string | null = '';
        //get from localstorage
        const timersData = fetchTimers();
        const selected = fetchSelectedTimer();
        const reports = fetchReports();
        const interval = fetchInterval();
        // get data from firebase
        if (user) {
          const fetchedData: FetchedData = {
            timers: null,
            reports: null,
            selected: null,
          };
          const dbRef = ref(getDatabase());
          // Fetch Reports from Firebase
          get(child(dbRef, `${user?.uid}/reports`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                fetchedData.reports = snapshot.val();
              } else {
                console.log('No data available');
              }
            })
            .catch((error) => {
              console.error(error);
            });
          // Fetch Timers
          get(child(dbRef, `${user?.uid}/timers`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                fetchedData.timers = snapshot.val();
              } else {
                console.log('No data available');
              }
            })
            .catch((error) => {
              console.error(error);
            });
          // Fetch Selected
          get(child(dbRef, `${user?.uid}/selected`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                fetchedData.selected = snapshot.val();
              } else {
                console.log('No data available');
              }
            })
            .catch((error) => {
              console.error(error);
            });
          // TODO: compare fetched data
          // if one of them null, replace the null with the value from other
          // TODO: The newest data will be added to the app
          console.log(fetchedData);
          newTimers =
            fetchedData.timers?.length !== 0  && timersData === null
              ? fetchedData.timers
              : fetchedData.timers == null && timersData != null
              ? timersData
              : fetchedData.timers;
          // newTimers =
          //   fetchedData.timers !== null ? fetchedData.timers : timersData != null ? timersData : fetchedData.timers;
          newReports =
            fetchedData.reports?.length !== 0 ? fetchedData.reports : reports != null ? reports : fetchedData.reports;
          newSelected =
            fetchedData.selected !== null && selected === null
              ? fetchedData.selected
              : fetchedData.selected == null && timersData != null
              ? selected
              : fetchedData.selected;
          console.log(newReports);
        } else {
          if (interval) updateInterval(interval);
          if (selected) onColectionChange('selected', selected);
          if (reports) onColectionChange('reports', reports); // Update reports
          if (timersData === null) {
            console.log(timersData);
            postTimers([DEFAULT_TIMER]);
            return;
          }
          newTimers = timersData;
          newSelected = selected || timersData[0].id;
          newReports = reports || [
            {
              id_timer: timersData[0].id,
              title: timersData[0].title,
              date: TODAY_STRING_DATE,
              report: 0,
              id: '' + +new Date(),
            },
          ];
        }
        if (newTimers == null) newTimers = [DEFAULT_TIMER];

        // Update Colection
        onColectionChange('timers', newTimers); // Update timers
        onColectionChange('selected', newSelected); // Update selected
        onColectionChange('reports', newReports); // Update reports
        // Post to firebase
        postTimersFirebase(timersData);
        postReportsFirebase(newReports);
        postSelectedFirebase(newSelected);
        //Update individual store based on fetched data
        const newTimer = findValueBasedOnId(timersData, newSelected) || newTimers[0];
        const newReport = newReports?.find((report) => report.id_timer === newTimer?.id) || {
          ...DEFAULT_REPORT,
          title: newTimer.title,
          id_timer: newTimer.id,
        };

        onTimerChange(newTimer); // update TimerStore
        onReportChange1(newReport); // update ReportStore
        // Update Local Storage
      } catch {
        return;
      }
    }

    init();
  }, [user]);

  return timers;
}

export default useTimers;
