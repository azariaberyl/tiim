import React from 'react';

interface props {
  title: string;
  category: string;
}
/**
 * Component of title and category
 * @param title The title of the component
 * @param category The category of the component
 */
function Description({ title, category }: props) {
  return (
    <div className='gap-1 my-4 flex justify-center flex-col items-center'>
      <p className='w-fit font-medium text-3xl capitalize'>{title}</p>
      <p className='w-fit font-medium text-secondary-dark text-xl capitalize'>{category}</p>
    </div>
  );
}

export default Description;
