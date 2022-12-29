import React, { useContext } from 'react';
import ClockCard from '../components/ClockCard';

const Homepage = () => {
  return (
    <div className='flex CONTAINER flex-col bg-inherit gap-5'>
      <div className='w-[600px] m-auto'>
        <ClockCard className='w-full' />
      </div>
    </div>
  );
};

export default Homepage;
