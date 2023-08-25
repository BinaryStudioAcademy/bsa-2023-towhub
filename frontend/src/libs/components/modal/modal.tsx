/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { Portal } from '../portal/portal.jsx';
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
  const { handleDisableContentContainerClick, handleOutsideClick } = useModal({
    onClose,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        className={getValidClassNames(
          styles.modal,
          isCentered && styles.centered,
        )}
        onClick={handleOutsideClick}
        role="button"
        tabIndex={0}
      >
        <div
          className={styles.content}
          onClick={handleDisableContentContainerClick}
          role="button"
          tabIndex={0}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export { Modal };
