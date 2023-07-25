import { useEffect } from 'react';
import useTimerColectionStore from '../contexts/TimerColectionStore';
import { fetchInterval, fetchReports, fetchSelectedTimer, fetchTimers, postSelected, postTimers } from '../utils/timer';
import useTimerStore from '../contexts/TimerStore';
import useReportStore from '../contexts/ReportStore';
import { findValueBasedOnId } from '../utils';
import { Reports } from '../types';
import useIntervalStore from '../contexts/IntervalStore';
import { DEFAULT_REPORT, DEFAULT_TIMER, TODAY_STRING_DATE } from '../utils/constants';
import useUserStore from '../contexts/UserStore';
import { child, get, getDatabase, ref } from 'firebase/database';
import { Timer } from '../types/timer';

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
        // Update Colection
        onColectionChange('timers', newTimers); // Update timers
        onColectionChange('selected', newSelected); // Update selected
        onColectionChange('reports', newReports); // Update reports

        //Update individual store based on fetched data
        const newTimer = findValueBasedOnId(timersData, newSelected) || newTimers[0];
        const newReport = newReports?.find((report) => report.id_timer === newTimer?.id) || {
          ...DEFAULT_REPORT,
          title: newTimer.title,
          id_timer: newTimer.id,
        };

        onTimerChange(newTimer); // update TimerStore
        onReportChange1(newReport); // update ReportStore

        // get data from firebase
        if (user) {
          const dbRef = ref(getDatabase());

          // Fetch Selected
          get(child(dbRef, `${user?.uid}/selected`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const fetchedSelected = snapshot.val();
                newSelected = fetchedSelected ? fetchedSelected : selected ? selected : selected;
                postSelected(newSelected || timersData[0].id);
              } else {
                console.log('No data available');
              }
            })
            .catch((error) => {
              console.error(error);
            });

          // Fetch Reports from Firebase
          get(child(dbRef, `${user?.uid}/reports`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const fetchedReports = snapshot.val();
                newReports = fetchedReports !== 0 ? fetchedReports : reports != null ? reports : fetchedReports;
                onColectionChange('reports', newReports); // Update reports
                const newReport = newReports?.find((report) => report.id_timer === newSelected) || {
                  ...DEFAULT_REPORT,
                  title: newTimer.title,
                  id_timer: newTimer.id,
                };
                onReportChange1(newReport); // update ReportStore
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
                const fetchedTimers = snapshot.val();
                newTimers = fetchedTimers !== 0 ? fetchedTimers : timersData != null ? timersData : timersData;
                onColectionChange('timers', newTimers); // Update reports
                const newTimer = findValueBasedOnId(newTimers, newSelected) || timersData[0];
                onTimerChange(newTimer); // update ReportStore
              } else {
                console.log('No data available');
              }
            })
            .catch((error) => {
              console.error(error);
            });

          return;
        }
        // Post to firebase

        // postTimersFirebase(timersData);
        // postReportsFirebase(newReports);
        // postSelectedFirebase(newSelected);
      } catch {
        return;
      }
    }

    init();
  }, [user]);

  return timers;
}

export default useTimers;
