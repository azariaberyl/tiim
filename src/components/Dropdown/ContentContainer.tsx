import React, { memo } from 'react';

function ContentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-test='timer-title-dropdown'
      onClick={(e) => e.stopPropagation()}
      className='absolute bg-white w-full z-10 rounded-md'
    >
      {children}
    </div>
  );
}

export default memo(ContentContainer);
