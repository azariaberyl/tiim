import React, {memo} from 'react';

function ContentContainer({ children }: { children: React.ReactNode }) {
  return <div className='absolute bg-white w-full z-10'>{children}</div>;
}

export default memo(ContentContainer);
