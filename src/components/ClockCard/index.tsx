import React, { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import Modal from '../Modal';
import Timer from '../Timer';
import Header from './Header';

function ClockCard(props: React.HTMLProps<HTMLDivElement>) {
  console.log('~Render ClockCard');

  const [isStartTimer, setStartTimer] = useState<boolean>(false);
  const [title, category, time] = ['Asignment', 'Project', '25:00'];

  const startHandler = () => setStartTimer((prev) => !prev);

  return (
    <div {...props}>
      <div
        style={{ boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.25)' }}
        className=' bg-white flex flex-col items-center p-3 rounded-xl overflow-hidden'
      >
        <Header />

        <Timer isStart={isStartTimer} />

        <div className='gap-1 my-4 flex justify-center flex-col items-center'>
          <p className='w-fit font-medium text-2xl'>{title}</p>
          <p className='w-fit font-medium text-secondary-dark text-xl'>
            {category}
          </p>
        </div>

        <div className='flex w-full items-center justify-center my-2'>
          <button
            onClick={startHandler}
            className='px-20 py-3 font-medium bg-primary-dark rounded text-primary-light text-3xl hover:bg-neutral-600 hover:drop-shadow-md'
          >
            {isStartTimer ? 'PAUSE' : 'START'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClockCard;
