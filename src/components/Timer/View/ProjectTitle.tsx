import { memo } from 'react';
import Dropdown from '../../Dropdown';
import ContentElement from '../../Dropdown/ContentElement';
import { useAppSelector } from '../../../app/hooks';

interface projectProps {
  id: string;
}
/**
 * Component of title and category
 * @param title The title of the component
 * @param category The category of the component
 */
const ProjectTitle = memo(({ id }: projectProps) => {
  const timers = useAppSelector((s) => s.data.timers);
  return (
    <div className='gap-1 mb-4 h-16 flex justify-center flex-col items-center'>
      {/* <p className='w-fit font-medium text-3xl capitalize'>{title}</p> */}
      <Dropdown currentId={id} data={timers} ContentElement={ContentElement} />
    </div>
  );
});

export default ProjectTitle;
