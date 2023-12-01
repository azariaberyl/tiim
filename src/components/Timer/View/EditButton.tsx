import { AiFillSetting } from 'react-icons/ai';
import { ModalType } from '../../../types';
import useModal from '../../../hooks/useModal';
import { memo } from 'react';

function EditButton({ editButtonHandler }: { editButtonHandler: (val: ModalType) => void }) {
  return (
    <button data-test='edit-button' onClick={() => editButtonHandler('edit')} title='Edit Timer' type='button'>
      <AiFillSetting className='text-2xl text-primary-dark hover:text-black' />
    </button>
  );
}

function Edit() {
  const [ModalComponent, isModalOpenHandler] = useModal();

  return (
    <>
      <ModalComponent />
      <div className='w-full flex justify-end px-2 mb-6'>
        <EditButton editButtonHandler={isModalOpenHandler} />
      </div>
    </>
  );
}

export default memo(Edit);
