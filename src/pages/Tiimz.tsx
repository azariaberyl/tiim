import ClockCard from '../components/ClockCard';
import ClockTabs from '../components/ClockTabs';
import ReportButton from '../components/Report/ReportButton';
import React, { useRef, useEffect } from 'react';

const Tiimz = () => {
  // Testing
  const clock = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);
  console.log();

  return (
    <div className='w-full flex flex-col justify-center h-full absolute items-center -mt-8'>
      {/* Section 1 */}
      <div>
        <ReportButton />
        <ClockTabs />
      </div>

      {/* Section 2 */}
      <ClockCard ref={clock} />
    </div>
  );
};

export default Tiimz;
