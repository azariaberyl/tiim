import React, { useContext } from 'react';
import useTimerStore from '../../contexts/TimerStore';
import useTimerColectionStore from '../../contexts/TimerColectionStore';

function Report() {
  const reports = useTimerColectionStore((state) => state.reports);

  const element = reports.map((val) => (
    <div key={val.id} className='flex text-primary-dark text-base gap-3 justify-between'>
      <p>{`${val.title} (${val.date})`}</p>
      <p className=' text-end px-5'>{val.report}</p>
    </div>
  ));

  return (
    <div className='bg-white px-5 py-3 rounded'>
      <h2 className='text-2xl font-semibold text-center'>Report</h2>
      <div className='flex flex-col text-gray-500 font-medium my-5'>
        <div className='flex'>
          <p className='pr-24 py-1'>TITLE</p>
          <p className='px-5 py-1'>MIN</p>
        </div>
        {element}
      </div>
    </div>
  );
}

export default Report;
