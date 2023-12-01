import React, { memo } from 'react';
import useBoolean from '../../hooks/useBoolean';
import ContentContainer from './ContentContainer';
import Add from './Add';
import { useAppSelector } from '../../app/hooks';
import { Timer1 } from '../../types/timer';

interface IContentElement {
  children: React.ReactNode;
  id: string;
  openDropdownHandler: (val?: boolean) => void;
}

interface props<T> {
  data: T[];
  currentId: string;
  ContentElement: ({ children, id, openDropdownHandler }: IContentElement) => JSX.Element;
}
/**
 *
 * @param data is the data of array that want to displayed
 * @param currentId is the current id to make sure what to display
 * @param ContentElement is function that return jsx element for dropdown content elemen type
 */
function Dropwdown<T extends Timer1>({ data, ContentElement, currentId }: props<T>) {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <div className='relative'>
      <button onClick={() => setIsOpen()} className='p-1 w-40'>
        {data.find((val) => val.id === currentId)?.title}
      </button>
      {isOpen && (
        <ContentContainer>
          {data.map(
            (val) =>
              val.id !== currentId && (
                <ContentElement id={val.id} key={val.id} openDropdownHandler={setIsOpen}>
                  {val.title}
                </ContentElement>
              )
          )}
          <Add setIsOpen={setIsOpen} />
        </ContentContainer>
      )}
    </div>
  );
}

export default memo(Dropwdown);
