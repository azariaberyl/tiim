import React, { useState } from 'react';

interface Modal {
  children: React.ReactNode;
  onClose: Function;
}

function Modal({ children, onClose }: Modal) {
  return (
    <div className='modal content-center flex' onClick={() => onClose()}>
      <div
        className='overflow-auto mt-16 h-fit'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
