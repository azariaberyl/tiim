import React, { ReactNode } from 'react';
import {
  IoAddOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from 'react-icons/io5';

interface Button {
  title: string;
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

function Button({
  title,
  children,
  selected = false,
  disabled = false,
}: Button) {
  if (disabled) {
    return (
      <button
        title={title}
        type='button'
        className='border border-primary-light rounded w-[30px] h-[30px]'
      >
        {children}
      </button>
    );
  }
  if (selected) {
    return (
      <button
        title={title}
        type='button'
        className='border bg-primary-dark text-primary-light border-secondary-dark rounded w-[30px] h-[30px]'
      >
        {children}
      </button>
    );
  }
  return (
    <button
      title={title}
      type='button'
      className='border border-secondary-dark rounded w-[30px] h-[30px]'
      disabled
    >
      {children}
    </button>
  );
}

function Pagination() {
  return (
    <div className='flex-1 flex items-center justify-center gap-4'>
      <Button disabled title='back'>
        <IoChevronBackOutline className=' text-primary-light text-2xl w-full' />
      </Button>
      <div className='flex gap-2'>
        <Button selected title='1'>
          1
        </Button>
        <Button title='2'>2</Button>
        <Button title='3'>3</Button>
        <Button title='Add'>
          <IoAddOutline className='font-bold text-secondary-dark text-2xl w-full' />
        </Button>
      </div>
      <Button title='Next' disabled>
        <IoChevronForwardOutline className='text-primary-light text-2xl w-full' />
      </Button>
    </div>
  );
}

export default Pagination;
