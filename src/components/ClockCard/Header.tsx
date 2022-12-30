import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoChevronDown } from 'react-icons/io5';
import Modal from '../Modal';
import Pagination from './Pagination';

function Header() {
  const [isReportOpen, setReportOpen] = useState<boolean>(false);
  const [text, setText] = useState('');
  console.log('Render Header');

  const editButtonHandler = () => {
    setReportOpen((prevState) => !prevState);
  };

  return (
    <>
      {isReportOpen && (
        <Modal onClose={editButtonHandler}>
          <div className='bg-white w-fit h-36'>
            <input
              className='border border-black outline-none p-1'
              type='text'
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </Modal>
      )}

      <div className='w-full flex justify-end px-4 mb-6'>
        <div className='flex items-center w-1/5'>
          <button className='flex gap-1 text-secondary-dark hover:text-inherit  items-center'>
            <p className='uppercase text-sm font-medium'>Project</p>
            <IoChevronDown />
          </button>
        </div>
        <Pagination />
        <div className='w-1/5 items-center justify-end flex gap-2'>
          <button onClick={editButtonHandler} title='Edit Timer' type='button'>
            <MdEdit className='text-2xl' />
          </button>
          <button title='Delete' type='button'>
            <MdDelete className='text-2xl' />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
