import React, { memo, useMemo } from 'react';
import useBoolean from '../../hooks/useBoolean';
import Dropwdown from '../Dropdown';
import { Timer } from '../../types';
import useTimers from '../../hooks/useTimers';

const exampleData: Timer[] = [
  {
    minutes: 10,
    seconds: 0,
    title: 'Dicoba',
    id: '1',
  },
  {
    minutes: 10,
    seconds: 0,
    title: 'Cek',
    id: '2',
  },
  {
    minutes: 10,
    seconds: 0,
    title: 'Cek 1 2',
    id: '3',
  },
];
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

  // This is element for content
  const ContentElement = useMemo(
    () =>
      ({ children }: { children: React.ReactNode }) =>
        <div>{children}</div>,
    []
  );

  return (
    <div className='gap-1 mb-4 h-16 flex justify-center flex-col items-center'>
      {/* <p className='w-fit font-medium text-3xl capitalize'>{title}</p> */}
      <Dropwdown currentId={id} data={timers} ContentElement={ContentElement} />
    </div>
  );
}

export default memo(Description);
