import React, { useRef, useCallback, HTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import { ModalType, Reports, Timer } from '../../types';
import useTimerStore from '../../contexts/TimerStore';
import { postReports, postSelected, postTimers } from '../../utils/timer';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import useReportStore from '../../contexts/ReportStore';
import { DEFAULT_REPORT, DEFAULT_TIMER } from '../../utils/constants';
import useTimerBreakStore from '../../contexts/TimeBreakStore';
import useIntervalStore from '../../contexts/IntervalStore';

function EditTimer({ editButtonHandler, closeModal }: props) {
  const { timer, onTimerChange } = useTimerStore();
  const [onChangeTimerColection, timers, reports] = useTimerColectionStore((s) => [s.onChange, s.timers, s.reports]);
  const [onReportChange, report] = useReportStore((s) => [s.reportChange1, s.report]);
  const { shortBreak, longBreak, changeBreak } = useTimerBreakStore();
  const { interval, updateInterval } = useIntervalStore();

  const [title, minutes, seconds] = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const [longbreakMin, longbreakSec] = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const [shortbreakMin, shortbreakSec] = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const intervalRef = useRef<HTMLInputElement>(null);

  const onRemoveTimerClick = useCallback(
    (selected: string) => {
      const defaultTimer: Timer = { ...DEFAULT_TIMER, id: '' + +new Date() };
      const newTimers = timers.filter((timer) => timer.id !== selected);
      const newReports = reports.filter((report) => report.id_timer !== selected);
      newTimers[0] ? newTimers : newTimers.push(defaultTimer);
      newReports[0] ? newReports : newReports.push({ ...DEFAULT_REPORT, id_timer: newTimers[0].id, id: '' + +new Date(), title: newTimers[0].title });
      //Update Colection
      console.log(newTimers, newReports);
      onChangeTimerColection('timers', newTimers);
      onChangeTimerColection('reports', newReports);
      // Update cloud
      postTimers(newTimers);
      postReports(newReports);

      // If timers[0] exists
      if (newTimers[0]) {
        const newTimer = newTimers[0];
        const newSelected = newTimer.id;
        //Update Colection
        onChangeTimerColection('selected', newSelected);
        // Change timer and report store
        const newReport = newReports.find((report) => report.id_timer == newSelected);
        onTimerChange(newTimer);
        onReportChange(newReport || { ...DEFAULT_REPORT, id_timer: newSelected, id: '' + +new Date(), title: newTimer.title });
        // Update cloud
        postSelected(newSelected);
      }
      closeModal('');
    },
    [timer]
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('onSubmit');
    e.preventDefault();
    editButtonHandler('');
    const newTimer: Timer = {
      title: title.current?.value ? title.current?.value : '',
      minutes: minutes.current?.value ? +minutes.current?.value : 0,
      seconds: seconds.current?.value ? +seconds.current?.value : 0,
      id: timer.id,
    };
    const newReports: Reports = reports.map((val) => (val.id_timer === newTimer.id ? { ...val, title: newTimer.title } : val));
    const newTimers = timers.map((val) => (val.id === newTimer.id ? newTimer : val));

    // Cloud
    postTimers(newTimers);
    postReports(newReports);
    // Update current timer and report
    onTimerChange(newTimer);
    onReportChange({ ...report, title: newTimer.title });
    // Update TimerColection
    onChangeTimerColection('timers', newTimers);
    onChangeTimerColection('reports', newReports);
    // Break Change
    const shortbreakVal = shortbreakMin.current?.value;
    const longbreakVal = longbreakMin.current?.value;
    if (longbreakVal !== undefined && shortbreakVal !== undefined) {
      console.log(shortbreakVal, longBreak);
      changeBreak('shortBreak', +shortbreakVal);
      changeBreak('longBreak', +longbreakVal);
    }
    // Interval Change
    updateInterval(Number(intervalRef.current?.value));
  };

  return (
    <form onSubmit={onSubmit} className='bg-white flex flex-col w-[450px] py-5 px-10 gap-2 rounded overflow-y-scroll max-h-full'>
      <p className='w-full text-center text-xl font-semibold mb-2'>EDIT TIMER</p>
      <div className='flex flex-col'>
        <div className='flex items-center py-5'>
          <Input title='Title' ref={title} defaultValue={timer.title} />
        </div>
        <div className='flex items-center py-5'>
          <Input type='number' title='Time' min={0} max={99} ref={minutes} step={1} defaultValue={timer.minutes} />
          <Input type='number' ref={seconds} defaultValue={timer.seconds} min={0} max={59} step={1} />
        </div>
        <div className='flex items-center py-5'>
          <Input type='number' title='Short Break' ref={shortbreakMin} defaultValue={shortBreak.min} min={0} max={59} step={1} />
          <Input type='number' ref={shortbreakSec} defaultValue={shortBreak.sec} min={0} max={59} step={1} />
        </div>
        <div className='flex items-center py-5'>
          <Input type='number' title='Long Break' ref={longbreakMin} defaultValue={longBreak.min} min={0} max={59} step={1} />
          <Input type='number' ref={longbreakSec} defaultValue={longBreak.sec} min={0} max={59} step={1} />
        </div>
        <div className='flex items-center py-5'>
          <Input type='number' title='Interval' ref={intervalRef} defaultValue={interval} step={1} min={0} max={99} />
        </div>
        <button type='button' onClick={() => onRemoveTimerClick(timer.id)} className='p-1 bg-red-600 text-white rounded shadow-md'>
          DELETE
        </button>
      </div>
      <button className='bg-slate-200 p-1 rounded shadow-md font-semibold' type='submit'>OK</button>
    </form>
  );
}

export default EditTimer;

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

const Input = forwardRef<HTMLInputElement, Input>((props, ref) => {
  if (props.title) {
    return (
      // <div className='flex items-center justify-between py-5'>
      <>
        <label className='w-1/3 tracking-wide font-semibold text-gray-800' htmlFor={props.title}>
          {props.title}
        </label>
        <input id={props.title} className='text-base outline-none p-1 border border-gray-200 rounded ml-auto' ref={ref} {...props} />
      </>
      // </div>
    );
  }
  return <input className='text-base outline-none ml-1 p-1 border border-gray-200 rounded ' ref={ref} {...props} />;
});
interface props {
  editButtonHandler: (val: ModalType) => void;
  closeModal: (val: ModalType) => void;
}
