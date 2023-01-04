import React, { useState, useContext, useRef } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoChevronDown } from 'react-icons/io5';
import Modal from '../Modal';
import Pagination from './Pagination';
import TimersContext from '../../contexts/TimersContext';
import { Timer } from '../../types';

function Header() {
  const { timer, onTimerChange, selected } = useContext(TimersContext);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [title, category, minutes, seconds] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const editButtonHandler = () => {
    setModalOpen((prevState) => !prevState);
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
    onTimerChange(selected, newTimer);
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={editButtonHandler}>
          <form
            onSubmit={onSubmit}
            className='bg-white w-fit flex flex-col py-5 px-10 gap-2 rounded'
          >
            <label htmlFor='title'>Title</label>
            <input
              id='title'
              ref={title}
              className='border border-black outline-none p-1'
              type='text'
              defaultValue={timer?.title}
            />
            <label htmlFor='category'>Category</label>
            <input
              id='category'
              ref={category}
              className='border border-black outline-none p-1'
              defaultValue={timer?.category}
              type='text'
            />
            <label htmlFor='minutes'>Minutes</label>
            <input
              id='minutes'
              ref={minutes}
              className='border border-black outline-none p-1'
              type='number'
              min={0}
              max={99}
              step={1}
              defaultValue={timer?.minutes}
            />
            <label htmlFor='seconds'>Second</label>
            <input
              id='seconds'
              ref={seconds}
              className='border border-black outline-none p-1'
              defaultValue={timer?.seconds}
              type='number'
              min={0}
              max={59}
              step={1}
            />
            <button type='submit'>Ok</button>
          </form>
        </Modal>
      )}

      <div className='w-full flex justify-end px-4 mb-6'>
        <div className='flex items-center w-1/5'>
          <button className='flex gap-1 text-secondary-dark hover:text-inherit  items-center'>
            <p className='uppercase text-sm font-medium'>Project</p>
            <IoChevronDown />
          </button>
        </div>
        <Pagination />
        <div className='w-1/5 items-center justify-end flex gap-2'>
          <button onClick={editButtonHandler} title='Edit Timer' type='button'>
            <MdEdit className='text-2xl' />
          </button>
          <button title='Delete' type='button'>
            <MdDelete className='text-2xl' />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
