import React, { useRef, forwardRef, InputHTMLAttributes } from 'react';
import { ModalType, Timer } from '../../types';
import useTimerStore from '../../contexts/TimerStore';
import { getReports, getTimers, postReports, postTimers, setReports, setTimers } from '../../utils/timer';
import useTimerColectionStore from '../../contexts/TimerColectionStore';
import useReportStore from '../../contexts/ReportStore';

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
}

function EditTimer({ editButtonHandler }: props) {
  const { timer, onTimerChange } = useTimerStore();
  const onChangeTimerColection = useTimerColectionStore((s) => s.onChange);
  const [onReportUpdate, report] = useReportStore((s) => [s.reportUpdate, s.report]);

  const [title, minutes, seconds] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editButtonHandler('');
    const newTimer: Timer = {
      title: title.current?.value ? title.current?.value : '',
      minutes: minutes.current?.value ? +minutes.current?.value : 0,
      seconds: seconds.current?.value ? +seconds.current?.value : 0,
      id: timer.id,
    };
    const newReports = getReports().map((val) => (val.id === newTimer.id ? { ...val, name: newTimer.title } : val));

    // LS
    setTimers(newTimer);
    setReports(newReports);
    // Update current timer and report
    onTimerChange(newTimer);
    onReportUpdate({ ...report, name: newTimer.title });
    // Update TimerColection
    onChangeTimerColection('timers', getTimers());
    onChangeTimerColection('reports', newReports);
    // Update Cloud
    postTimers(getTimers());
    postReports(newReports);
  };

  return (
    <form onSubmit={onSubmit} className='bg-white w-fit flex flex-col py-5 px-10 gap-2 rounded'>
      <p className='m-auto text-xl font-semibold mb-2'>EDIT TIMER</p>
      <div className='flex flex-col'>
        <Input type='text' title='Title' ref={title} defaultValue={timer?.title} />
        <Input type='number' title='Minutes' min={0} max={99} ref={minutes} step={1} defaultValue={timer?.minutes} />
        <Input type='number' title='Seconds' ref={seconds} defaultValue={timer?.seconds} min={0} max={59} step={1} />
      </div>
      <button type='submit'>Ok</button>
    </form>
  );
}

export default EditTimer;
