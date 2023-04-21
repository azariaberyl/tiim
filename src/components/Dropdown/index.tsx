import React from 'react';
import useBoolean from '../../hooks/useBoolean';
import ContentContainer from './ContentContainer';

interface IContentElement {
  children: React.ReactNode;
}

interface props<T extends { title: string; id: string }> {
  data: T[];
  currentId: string;
  ContentElement: ({ children }: IContentElement) => JSX.Element;
}
/**
 *
 * @param data is the data of array that want to displayed
 * @param currentId is the current id to make sure what to display
 * @param ContentElement is function that return jsx element for dropdown content elemen type
 */
function Dropwdown<T extends { title: string; id: string }>({
  data,
  ContentElement,
  currentId,
}: props<T>) {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <div className='relative'>
      <button onClick={() => setIsOpen()} className='p-1'>
        {data.find((val) => val.id === currentId)?.title}
      </button>
      {isOpen && (
        <ContentContainer>
          {data.map(
            (val) =>
              val.id !== currentId && (
                <ContentElement key={val.id}>{val.title}</ContentElement>
              )
          )}
          <button className='w-full'>+</button>
        </ContentContainer>
      )}
    </div>
  );
}

export default Dropwdown;
