import React, { useState } from 'react';
import { ModalType } from '../types';
import EditTimer from '../components/EditTimer';
import Modal from '../components/Modal';
import Report from '../components/Report';

/**
 * Handle modal component
 * @param initial
 * @returnsView/Report
 */

function useModal(initial: ModalType = ''): [() => JSX.Element | null, (val: ModalType) => void] {
  const [modal, setModal] = useState<ModalType>(initial);

  const onChange = (val: ModalType) => setModal(val);

  const ModalComponent = () => {
    switch (modal) {
      case 'edit':
        return (
          <Modal onClose={onChange}>
            <EditTimer closeModal={onChange} />
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
