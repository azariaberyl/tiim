import React, { useContext } from 'react';
import useTimerStore from '../../contexts/TimerStore';
import useTimerColectionStore from '../../contexts/TimerColectionStore';

function Report() {
  const reports = useTimerColectionStore((state) => state.reports);
  const timer = useTimerStore((state) => state.timer);

  return (
    <div className='bg-white px-5 py-3 rounded'>
      <h2 className='text-2xl font-semibold text-center'>Report</h2>
      <div className='flex flex-col text-gray-500 font-medium my-5'>
        <div className='flex'>
          <p className='pr-24 py-1'>TITLE</p>
          <p className='px-5 py-1'>MIN</p>
        </div>
        {reports.map((report) =>
          report.report.map((val) => (
            <div className='flex text-primary-dark text-base gap-3 justify-between'>
              <p>{report.name}</p>
              <p className=' text-end px-5'>{val.report}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Report;
