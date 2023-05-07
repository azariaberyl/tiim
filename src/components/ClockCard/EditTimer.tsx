import React, { useRef, forwardRef, InputHTMLAttributes, useCallback } from 'react';
import { ModalType, Timer } from '../../types';
import useTimerStore from '../../contexts/TimerStore';
import { getReports, getTimers, setReports, setSelected, setTimers } from '../../utils/timer';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import useReportStore from '../../contexts/ReportStore';
import { DEFAULT_REPORT } from '../../utils/constants';

function EditTimer({ editButtonHandler, closeModal }: props) {
  const { timer, onTimerChange } = useTimerStore();
  const [onChangeTimerColection, timers, reports] = useTimerColectionStore((s) => [s.onChange, s.timers, s.reports]);
  const [onReportChange, report] = useReportStore((s) => [s.reportChange1, s.report]);

  const [title, minutes, seconds] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const onRemoveTimerClick = useCallback(
    (selected: string) => {
      const newTimers = timers.filter((timer) => timer.id !== selected);
      const newReports = reports.filter((report) => report.id !== selected);
      const newSelected = newTimers[0].id;
      console.log(newTimers, newReports, newSelected);
      //Update Colection
      onChangeTimerColection('selected', newSelected);
      onChangeTimerColection('timers', newTimers);
      onChangeTimerColection('reports', newReports);
      // Update local storage
      setSelected(newSelected);
      setTimers(newTimers);
      setReports(newReports);
      // Change timer and report store
      const newTimer = timers[0];
      const newReport = newReports.find((report) => report.id == newSelected);
      onTimerChange(newTimer);
      onReportChange(newReport || { ...DEFAULT_REPORT, id: newSelected });
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
    const newReports = reports.map((val) => (val.id === newTimer.id ? { ...val, name: newTimer.title } : val));
    const newTimers = timers.map((val) => (val.id === newTimer.id ? newTimer : val));

    // LS
    setTimers(newTimers);
    setReports(newReports);
    // Update current timer and report
    onTimerChange(newTimer);
    onReportChange({ ...report, name: newTimer.title });
    // Update TimerColection
    onChangeTimerColection('timers', getTimers());
    onChangeTimerColection('reports', newReports);
  };

  return (
    <form onSubmit={onSubmit} className='bg-white w-fit flex flex-col py-5 px-10 gap-2 rounded'>
      <p className='m-auto text-xl font-semibold mb-2'>EDIT TIMER</p>
      <div className='flex flex-col'>
        <Input type='text' title='Title' ref={title} defaultValue={timer?.title} />
        <Input type='number' title='Minutes' min={0} max={99} ref={minutes} step={1} defaultValue={timer?.minutes} />
        <Input type='number' title='Seconds' ref={seconds} defaultValue={timer?.seconds} min={0} max={59} step={1} />
        <button type='button' onClick={() => onRemoveTimerClick(timer.id)} className='p-1 bg-red-600 text-white'>
          DELETE
        </button>
      </div>
      <button type='submit'>Ok</button>
    </form>
  );
}

export default EditTimer;

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const Input = forwardRef<HTMLInputElement, Input>((props, ref) => (
  <div className='flex justify-between gap-10 items-center border-t py-7'>
    <label className='text-xl font-semibold text-gray-800' htmlFor={props.title}>
      {props.title}
    </label>
    <input id={props.title} className='outline-none p-2 border border-gray-200 rounded' ref={ref} {...props} />
  </div>
));

interface props {
  editButtonHandler: (val: ModalType) => void;
  closeModal: (val: ModalType) => void;
}
