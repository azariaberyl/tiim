import React, { useState } from 'react';
import { ModalType } from '../types';
import EditTimer from '../components/ClockCard/EditTimer';
import Report from '../components/Report/Report';
import Modal from '../components/Modal';

/**
 * Handle modal component
 * @param initial
 * @returns
 */

function useModal(initial: ModalType = ''): [() => JSX.Element | null, (val: ModalType) => void] {
  const [modal, setModal] = useState<ModalType>(initial);

  const onChange = (val: ModalType) => setModal(val);

  const ModalComponent = () => {
    switch (modal) {
      case 'edit':
        return (
          <Modal onClose={onChange}>
            <EditTimer editButtonHandler={onChange} closeModal={onChange} />
          </Modal>
        );
      case 'report':
        return (
          <Modal onClose={onChange}>
            <Report />
          </Modal>
        );
      default:
        return null;
    }
  };

  return [ModalComponent, onChange];
}

export default useModal;
