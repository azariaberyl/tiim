import React, { memo } from 'react';
import useModal from '../../../hooks/useModal';
import { ModalType } from '../../../types';

function ReportButton() {
  const [ModalComponent, isModalOpenHandler] = useModal();

  return (
    <>
      <ModalComponent />
      <Button isModalOpenHandler={isModalOpenHandler} />
    </>
  );
}

export default memo(ReportButton);

function Button({ isModalOpenHandler }: { isModalOpenHandler: (val: ModalType) => void }) {
  return (
    <div className='flex justify-end w-full my-3 md:my-1 md:w-[600px] md:m-0'>
      <button
        onClick={() => isModalOpenHandler('report')}
        className='text-white/90 font-semibold uppercase bg-default-light/25 py-2 px-3 text-sm tracking-wide rounded hover:text-white hover:bg-default-light/30'
      >
        Report
      </button>
    </div>
  );
}
