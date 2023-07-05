import React, { memo } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { IoBarChart, IoChevronDown } from 'react-icons/io5';
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
      <MenuContainer>
        <EditButton editButtonHandler={isModalOpenHandler} />
      </MenuContainer>
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

function MenuContainer({ children }: { children: React.ReactNode }) {
  return <div className='w-full flex justify-end px-2 mb-6'>{children}</div>;
}

export default memo(Menu);
