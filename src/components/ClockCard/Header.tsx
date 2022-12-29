import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from '../Modal';

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

      <div className='w-full flex justify-end mr-4 gap-1'>
        <button onClick={editButtonHandler} title='Edit Timer' type='button'>
          <MdEdit className='text-primary-dark text-2xl' />
        </button>
        <button title='Delete' type='button'>
          <MdDelete className='text-primary-dark text-2xl' />
        </button>
      </div>
    </>
  );
}

export default Header;
