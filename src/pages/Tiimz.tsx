import ClockCard from '../components/ClockCard';
import ClockTabs from '../components/ClockTabs';
import ReportButton from '../components/Report/ReportButton';
import React, { useRef, useEffect } from 'react';
import TopBar from '../components/TopBar/TopBar';

const Tiimz = () => {
  // Testing
  const clock = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);

  return (
    <div className='w-full items-center md:h-screen flex flex-col'>
      <TopBar />
      <div className='w-full flex flex-col justify-center h-full absolute items-center lg:-mt-8'>
        {/* Section 1 */}
        <div>
          <ReportButton />
          <ClockTabs />
        </div>

        {/* Section 2 */}
        <ClockCard ref={clock} />
      </div>
    </div>
  );
};

export default Tiimz;
