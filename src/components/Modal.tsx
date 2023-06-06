import React, { useState } from 'react';

interface Modal {
  children: React.ReactNode;
  onClose: Function;
}

function Modal({ children, onClose }: Modal) {
  return (
    <div className='fixed z-50 top-0 left-0 w-screen h-screen bg-[#00000059]' onClick={() => onClose('')}>
      <div className='overflow-auto max-h-full mt-4 w-fit mx-auto' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
