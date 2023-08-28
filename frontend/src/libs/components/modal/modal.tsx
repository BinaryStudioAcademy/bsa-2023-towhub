/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { createPortal } from 'react-dom';

import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { useModal } from './hooks/hooks.js';
import styles from './styles.module.scss';

type Properties = {
  isOpen: boolean;
  isCentered: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<Properties> = ({
  isOpen,
  isCentered,
  onClose,
  children,
}: Properties) => {
  const {
    handleDisableContentContainerClick,
    handleOutsideClick,
    handleExitKeydown,
  } = useModal({
    onClose,
  });

  if (!isOpen) {
    return null;
  }

  const modalElement = (
    <div
      className={getValidClassNames(
        styles.modal,
        isCentered && styles.centered,
      )}
      onClick={handleOutsideClick}
      onKeyDown={handleExitKeydown}
      role="button"
      tabIndex={0}
    >
      <dialog
        className={styles.content}
        onClick={handleDisableContentContainerClick}
        onKeyDown={handleExitKeydown}
        role="button"
        tabIndex={0}
      >
        {children}
      </dialog>
    </div>
  );

  return createPortal(
    modalElement,
    document.querySelector('#modal-root') as Element,
  );
};

export { Modal };
