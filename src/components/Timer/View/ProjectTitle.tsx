import { memo } from 'react';
import Dropdown from '../../Dropdown';
import ContentElement from '../../Dropdown/ContentElement';
import { useAppSelector } from '../../../app/hooks';

const ProjectTitle = memo(() => {
  const timers = useAppSelector((s) => s.data.timers);
  const id = useAppSelector((s) => s.data.activeTimerId);

  return (
    <div className='gap-1 mb-4 h-16 flex justify-center flex-col items-center'>
      {/* <p className='w-fit font-medium text-3xl capitalize'>{title}</p> */}
      <Dropdown currentId={id} data={timers} ContentElement={ContentElement} />
    </div>
  );
});

export default ProjectTitle;
