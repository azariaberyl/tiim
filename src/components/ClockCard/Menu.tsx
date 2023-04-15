import React, { memo } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { IoBarChart, IoChevronDown } from 'react-icons/io5';
import { Outlet } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import { ModalType } from '../../types';

/**
 *
 * @returns {JSX.Element} Contain menu of the timer like edit, report, etc
 */

function Menu(): JSX.Element {
  const [ModalComponent, isModalOpenHandler] = useModal();

  return (
    <>
      <ModalComponent />

      <div className='w-full flex justify-end px-2 mb-6'>
        <EditButton editButtonHandler={isModalOpenHandler} />
      </div>
      <Outlet />
    </>
  );
}

function EditButton({ editButtonHandler }: { editButtonHandler: (val: ModalType) => void }) {
  return (
    <button onClick={() => editButtonHandler('edit')} title='Edit Timer' type='button'>
      <AiFillSetting className='text-2xl text-primary-dark hover:text-black' />
    </button>
  );
}

export default memo(Menu);
