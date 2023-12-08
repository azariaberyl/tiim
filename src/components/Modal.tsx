import React, { useState } from 'react';

interface Modal {
  children: React.ReactNode;
  onClose: Function;
}

function Modal({ children, onClose }: Modal) {
  return (
    <div className='fixed z-50 top-0 left-0 w-screen h-screen py-4 bg-[#00000059]' onClick={() => onClose('')}>
      <div
        className='overflow-y-auto overflow-x-hidden max-h-full w-fit mx-auto rounded'
        data-test='modal'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
