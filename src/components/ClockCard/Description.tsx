import React, { memo, useMemo } from 'react';
import { Timer } from '../../types';
import useTimers from '../../hooks/useTimers';
import Dropdown from '../Dropdown';

function ContentElement({ children, id }: { children: React.ReactNode; id: string }) {
  const onClick = () => {};

  return <button>{children}</button>;
}

interface props {
  id: string;
}
/**
 * Component of title and category
 * @param title The title of the component
 * @param category The category of the component
 */
function Description({ id }: props) {
  const timers = useTimers();

  return (
    <div className='gap-1 mb-4 h-16 flex justify-center flex-col items-center'>
      {/* <p className='w-fit font-medium text-3xl capitalize'>{title}</p> */}
      <Dropdown currentId={id} data={timers} ContentElement={ContentElement} />
    </div>
  );
}

export default memo(Description);
