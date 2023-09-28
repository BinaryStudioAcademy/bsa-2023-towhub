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
  dialogContentClassName?: string;
  dialogClassName?: string;
};

const Modal: React.FC<Properties> = ({
  isOpen,
  isCentered,
  onClose,
  dialogContentClassName,
  dialogClassName,
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
    <dialog
      className={getValidClassNames(
        styles.modal,
        isCentered && styles.centered,
        dialogClassName,
      )}
      onClick={handleOutsideClick}
      onKeyDown={handleExitKeydown}
      role="button"
      tabIndex={0}
    >
      <div
        className={getValidClassNames(styles.content, dialogContentClassName)}
        onClick={handleDisableContentContainerClick}
        onKeyDown={handleExitKeydown}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    </dialog>
  );

  return createPortal(
    modalElement,
    document.querySelector('#modal-root') as Element,
  );
};

export { Modal };
