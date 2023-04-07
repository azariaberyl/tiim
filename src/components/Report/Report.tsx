import React, { useContext } from 'react';
import TimersContext from '../../contexts/TimerStore';
import useReportStore from '../../contexts/ReportStore';
import useTimerStore from '../../contexts/TimerStore';

function Report() {
  const report = useReportStore((state) => state.report);
  const timer = useTimerStore((state) => state.timer);
  const minutes = Math.round(report / 60);

  return (
    <div className='bg-white px-5 py-3 rounded'>
      <h2 className='text-2xl font-semibold text-center'>Report</h2>
      <div className='flex flex-col text-gray-500 font-medium my-5'>
        <div className='flex'>
          <p className='pr-24 py-1'>TITLE</p>
          <p className='px-5 py-1'>MIN</p>
        </div>
        <div className='flex text-primary-dark text-base gap-3 justify-between'>
          <p>{timer?.title}</p>
          <p className=' text-end px-5'>{minutes}</p>
        </div>
      </div>
    </div>
  );
}

export default Report;
