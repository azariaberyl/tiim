import React from 'react';
import useBoolean from '../../hooks/useBoolean';
import ContentContainer from './ContentContainer';

interface IContentElement {
  children: React.ReactNode;
}

interface props<T extends { title: string; id: string }> {
  data: T[];
  ContentElement: ({ children }: IContentElement) => JSX.Element;
}

function Dropwdown<T extends { title: string; id: string }>({ data, ContentElement }: props<T>) {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <div className='relative'>
      <button onClick={() => setIsOpen()} className='p-1'>
        Dropwdown
      </button>
      {isOpen && (
        <ContentContainer>
          {data.map((val) => (
            <ContentElement key={val.id}>{val.title}</ContentElement>
          ))}
          <button className='w-full'>+</button>
        </ContentContainer>
      )}
    </div>
  );
}

export default Dropwdown;
