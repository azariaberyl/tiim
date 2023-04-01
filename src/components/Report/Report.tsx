import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import TimersContext from '../../contexts/TimerContext/TimersContext';

function Report() {
  const { timer, reports, selected } = useContext(TimersContext);
  const minutes = Math.round(reports[selected] / 60);
  const navigate = useNavigate();
  const onCloseHandler = () => navigate('/');

  return (
    <Modal onClose={onCloseHandler}>
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
    </Modal>
  );
}

export default Report;
