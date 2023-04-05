import React, { useState, useContext, useRef, forwardRef, InputHTMLAttributes } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoBarChart, IoChevronDown } from 'react-icons/io5';
import Modal from '../Modal';
import TimersContext from '../../contexts/TimerContext/TimersContext';
import { Timer } from '../../types';
import { Link, Outlet } from 'react-router-dom';
import useContextMemo from '../../hooks/useContextMemo';

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

/**
 *
 * @returns {JSX.Element} Contain menu of the timer like edit, report, etc
 */

function Menu() {
  const { timer, onTimerChange } = useContextMemo(TimersContext);

  const [isEditOpen, setEditOpen] = useState<boolean>(false);

  const [title, category, minutes, seconds] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const editButtonHandler = () => {
    setEditOpen((prevState) => !prevState);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editButtonHandler();
    const newTimer: Timer = {
      category: category.current?.value ? category.current?.value : '',
      title: title.current?.value ? title.current?.value : '',
      minutes: minutes.current?.value ? +minutes.current?.value : 0,
      seconds: seconds.current?.value ? +seconds.current?.value : 0,
    };
    onTimerChange(newTimer);
  };

  return (
    <>
      {isEditOpen && (
        <Modal onClose={editButtonHandler}>
          <form onSubmit={onSubmit} className='bg-white w-fit flex flex-col py-5 px-10 gap-2 rounded'>
            <p className='m-auto text-xl font-semibold mb-2'>EDIT TIMER</p>
            <div className='flex flex-col'>
              <Input type='text' title='Title' ref={title} defaultValue={timer?.title} />
              <Input type='text' title='Category' ref={category} defaultValue={timer?.category} />
              <Input
                type='number'
                title='Minutes'
                min={0}
                max={99}
                ref={minutes}
                step={1}
                defaultValue={timer?.minutes}
              />
              <Input
                type='number'
                title='Seconds'
                ref={seconds}
                defaultValue={timer?.seconds}
                min={0}
                max={59}
                step={1}
              />
            </div>
            <button type='submit'>Ok</button>
          </form>
        </Modal>
      )}

      <div className='w-full flex justify-between px-4 mb-6'>
        <div className='flex items-center w-1/5'>
          <button className='flex gap-1 text-secondary-dark hover:text-inherit  items-center'>
            <p className='uppercase text-sm font-medium'>Project</p>
            <IoChevronDown />
          </button>
        </div>

        <div className='w-1/5 items-center justify-end flex gap-2'>
          <button className='flex items-center gap-1 bg-gray-50 p-1 rounded text-primary-dark hover:text-[#1E1E1E] hover:bg-gray-200'>
            <IoBarChart className='text-xl' />
            <p className='font-medium'>Report</p>
          </button>
          <button onClick={editButtonHandler} title='Edit Timer' type='button'>
            <MdEdit className='text-2xl text-primary-dark hover:text-gray-900' />
          </button>
          <button title='Delete' type='button' className='hover:cursor-default'>
            <MdDelete className='text-2xl text-gray-300' />
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Menu;
