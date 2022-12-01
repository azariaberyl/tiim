import React, {ReactNode} from 'react';

interface MainButton {
  children: ReactNode;
  type?: 'primary' | 'secondary';
}

function Button({children, type = 'primary'}: MainButton) {
  if (type === 'secondary') {
    return (
      <button type='button' className='p-1 bg-secondary-dark font-bold text-white rounded-md flex gap-2 items-center'>
        {children}
      </button>
    );
  }
  return (
    <button type='button' className='px-5 py-1 text-2xl bg-primary-dark text-white rounded font-medium flex gap-1 items-center hover:bg-black hover:text-primary-light'>
      {children}
    </button>
  );
}

export default Button;
