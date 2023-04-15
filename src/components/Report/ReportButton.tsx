import React from 'react';
import useModal from '../../hooks/useModal';

function ReportButton() {
  const [ModalComponent, isModalOpenHandler] = useModal();

  return (
    <>
      <ModalComponent />
      <div className='flex justify-end w-[600px] mb-5'>
        <button
          onClick={() => isModalOpenHandler('report')}
          className='mx-3 text-white/90 font-semibold uppercase bg-default-light/25 py-2 px-3 text-sm tracking-wide rounded hover:text-white hover:bg-default-light/30'
        >
          Report
        </button>
      </div>
    </>
  );
}

export default ReportButton;
