import React, { useState } from 'react';

interface Modal {
  children: React.ReactNode;
  onClose: Function;
}

function Modal({ children, onClose }: Modal) {
  console.log('Render Modal');

  return (
    <div
      className='modal justify-center content-center flex'
      onClick={() => onClose()}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default Modal;
