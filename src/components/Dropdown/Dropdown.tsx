import React, { memo } from 'react';
import useBoolean from '../../hooks/useBoolean';
import ContentContainer from './ContentContainer';
import Add from './Add';
import { useAppSelector } from '../../app/hooks';
import { Timer1 } from '../../types/timer';
import { Report } from '../../types';

interface ContentElementI {
  children: React.ReactNode;
  openDropdownHandler: (val?: boolean) => void;
  data: Timer1;
  reports: Report;
}
interface props<T> {
  data: T[];
  currentId: string;
  ContentElement: ({ children, openDropdownHandler, data, reports }: ContentElementI) => JSX.Element;
}
/**
 *
 * @param data is the data of array that want to displayed
 * @param currentId is the current id to make sure what to display
 * @param ContentElement is function that return jsx element for dropdown content elemen type
 */
function Dropwdown<T extends Timer1>({ data, ContentElement, currentId }: props<T>) {
  const [isOpen, setIsOpen] = useBoolean(false);
  const timersReports = useAppSelector((s) => s.data.timerReports);

  return (
    <div className='relative'>
      <button data-test='timer-title' onClick={() => setIsOpen()} className='p-1 w-40'>
        {data.find((val) => val.id === currentId)?.title}
      </button>
      {isOpen && (
        <ContentContainer>
          {data.map((val) => {
            const reports = timersReports.find((report) => report.id_timer === val.id) || {
              id_timer: val.id,
              reports: [],
            };
            return (
              val.id !== currentId && (
                <ContentElement key={val.id} openDropdownHandler={setIsOpen} data={val} reports={reports}>
                  {val.title}
                </ContentElement>
              )
            );
          })}
          <Add setIsOpen={setIsOpen} />
        </ContentContainer>
      )}
    </div>
  );
}

export default memo(Dropwdown);
