import ClockCard from '../components/ClockCard';
import ClockTabs from '../components/ClockTabs';
import ReportButton from '../components/Report/ReportButton';
import React, { useRef, useEffect } from 'react';

const Tiimz = () => {
  const clock = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  return (
    <div className='w-full flex flex-col justify-center h-full absolute items-center -mt-8'>
      <div>
        <ReportButton />
        <ClockTabs />
      </div>
      <ClockCard ref={clock} />
    </div>
  );
};

export default Tiimz;
