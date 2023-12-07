import { useMemo, useRef, useState } from 'react';
import { ModalType } from '../../../types';
import Input from './Input';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toMinutesAndString } from '../../../utils';
import onSubmit from '../Controller/EditTimerSubmit';
import { deleteTimer } from '../../../features/dataSlice';
import { changeTimer } from '../../../features/timerSlice';
import onDelete from '../Controller/DeleteTimer';

function EditTimer({ closeModal }: { closeModal: (val: ModalType) => void }) {
  const dispatch = useAppDispatch();
  // Get data from store
  const title = useAppSelector((s) => s.timer.title);
  const shortBreakValue = useAppSelector((s) => s.timer.shortBreak);
  const longBreakValue = useAppSelector((s) => s.timer.longBreak);
  const timeValue = useAppSelector((s) => s.timer.pomodoroTimer);
  const shortBreak = useMemo(() => toMinutesAndString(shortBreakValue), [shortBreakValue]);
  const longBreak = useMemo(() => toMinutesAndString(longBreakValue), [longBreakValue]);
  const time = useMemo(() => toMinutesAndString(timeValue), [timeValue]);
  const id = useAppSelector((s) => s.data.activeTimerId);
  const timers = useAppSelector((s) => s.data.timers);
  const timerReports = useAppSelector((s) => s.data.timerReports);

  // Control the form
  const [timer, setTimer] = useState({
    time,
    shortBreak,
    longBreak,
  });
  const [titleForm, setTitleForm] = useState(title);
  const [interval, setInterval] = useState(4);

  // When input change handler
  const onTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [formattedTime, timeUnit] = name.split('.');
    // If `formattedTime` is not part of the timer object, nothing happens.
    if (formattedTime !== 'time' && formattedTime !== 'shortBreak' && formattedTime !== 'longBreak') return;
    if (value === '') return;

    setTimer((val) => ({
      ...val,
      [formattedTime]: {
        ...val[formattedTime],
        [timeUnit]: value,
      },
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e, dispatch, timer, titleForm, 4, id);
        closeModal('');
      }}
      className='bg-white flex flex-col md:w-[450px] py-5 px-10 gap-2 rounded overflow-y-scroll max-h-full'
    >
      <p className='w-full text-center text-xl font-semibold mb-2'>EDIT TIMER</p>
      <div className='flex flex-col'>
        <div className='flex gap-2 items-center py-5 '>
          <Input
            data-test='input-title'
            title='Title'
            onChange={(e) => setTitleForm(e.target.value)}
            defaultValue={title}
          />
        </div>
        <div className='flex items-center py-5'>
          <Input
            data-test='input-timermin'
            type='number'
            name='time.min'
            onChange={onTimerChange}
            title='Time'
            min={0}
            max={99}
            step={1}
            defaultValue={timer.time.min}
          />
          <Input
            data-test='input-timersec'
            type='number'
            name='time.sec'
            onChange={onTimerChange}
            defaultValue={timer.time.sec}
            min={0}
            max={59}
            step={1}
          />
        </div>
        <div className='flex items-center py-5'>
          <Input
            data-test='input-shortBreakmin'
            type='number'
            name='shortBreak.min'
            onChange={onTimerChange}
            title='Short Break'
            defaultValue={shortBreak.min}
            min={0}
            max={59}
            step={1}
          />
          <Input
            data-test='input-shortBreaksec'
            type='number'
            name='shortBreak.sec'
            onChange={onTimerChange}
            defaultValue={shortBreak.sec}
            min={0}
            max={59}
            step={1}
          />
        </div>
        <div className='flex items-center py-5'>
          <Input
            data-test='input-longBreakmin'
            type='number'
            name='longBreak.min'
            onChange={onTimerChange}
            title='Long Break'
            defaultValue={longBreak.min}
            min={0}
            max={59}
            step={1}
          />
          <Input
            data-test='input-longBreaksec'
            type='number'
            name='longBreak.sec'
            onChange={onTimerChange}
            defaultValue={longBreak.sec}
            min={0}
            max={59}
            step={1}
          />
        </div>
        <div className='flex items-center py-5'>
          <Input
            type='number'
            title='Interval'
            onChange={(e) => setInterval(parseInt(e.target.value))}
            defaultValue={interval}
            step={1}
            min={0}
            max={99}
          />
        </div>
        <button
          type='button'
          onClick={() => {
            onDelete(dispatch, id, timers, timerReports);
            closeModal('');
          }}
          className='p-1 bg-red-600 text-white rounded shadow-md'
        >
          DELETE
        </button>
      </div>
      <button className='bg-slate-200 p-1 rounded shadow-md font-semibold' data-test='edit-submit' type='submit'>
        OK
      </button>
    </form>
  );
}

export default EditTimer;
