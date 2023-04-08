import React, { memo } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
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

      <div className='w-full flex justify-between px-4 mb-6'>
        <ProjectButton />
        <div className='w-1/5 items-center justify-end flex gap-2'>
          <ReportButton reportButtonHandler={isModalOpenHandler} />
          <EditButton editButtonHandler={isModalOpenHandler} />
          <DeleteButton />
        </div>
      </div>
      <Outlet />
    </>
  );
}

function ProjectButton() {
  return (
    <div className='flex items-center w-1/5'>
      <button className='flex gap-1 text-secondary-dark hover:text-inherit  items-center'>
        <p className='uppercase text-sm font-medium'>Project</p>
        <IoChevronDown />
      </button>
    </div>
  );
}

function ReportButton({ reportButtonHandler }: { reportButtonHandler: (val: ModalType) => void }) {
  return (
    <button
      onClick={() => reportButtonHandler('report')}
      className='flex items-center gap-1 bg-gray-50 p-1 rounded text-primary-dark hover:text-[#1E1E1E] hover:bg-gray-200'
    >
      <IoBarChart className='text-xl' />
      <p className='font-medium'>Report</p>
    </button>
  );
}
function EditButton({ editButtonHandler }: { editButtonHandler: (val: ModalType) => void }) {
  return (
    <button onClick={() => editButtonHandler('edit')} title='Edit Timer' type='button'>
      <MdEdit className='text-2xl text-primary-dark hover:text-gray-900' />
    </button>
  );
}
function DeleteButton() {
  return (
    <button title='Delete' type='button' className='hover:cursor-default'>
      <MdDelete className='text-2xl text-gray-300' />
    </button>
  );
}

export default memo(Menu);
