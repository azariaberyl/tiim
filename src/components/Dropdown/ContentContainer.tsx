import React, { memo } from 'react';

function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div onClick={(e) => e.stopPropagation()} className='absolute bg-white w-full z-10'>
      {children}
    </div>
  );
}

export default memo(ContentContainer);
