import React, { memo } from 'react';

interface props {
  title: string;
}
/**
 * Component of title and category
 * @param title The title of the component
 * @param category The category of the component
 */
function Description({ title }: props) {
  return (
    <div className='gap-1 my-4 h-16 flex justify-center flex-col items-center'>
      <p className='w-fit font-medium text-3xl capitalize'>{title}</p>
    </div>
  );
}

export default memo(Description);
