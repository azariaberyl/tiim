import { memo } from 'react';
import Dropdown from '../../Dropdown';
import ContentElement from '../../Dropdown/ContentElement';

interface projectProps {
  id: string;
}
/**
 * Component of title and category
 * @param title The title of the component
 * @param category The category of the component
 */
const ProjectTitle = memo(({ id }: projectProps) => {
  return (
    <div className='gap-1 mb-4 h-16 flex justify-center flex-col items-center'>
      {/* <p className='w-fit font-medium text-3xl capitalize'>{title}</p> */}
      <Dropdown currentId={id} data={[{ title: 'My Project', id: '1' }]} ContentElement={ContentElement} />
    </div>
  );
});

export default ProjectTitle;
