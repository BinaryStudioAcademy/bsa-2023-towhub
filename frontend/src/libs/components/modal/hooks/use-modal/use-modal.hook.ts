import { EXIT_BUTTON } from '~/libs/components/modal/libs/constants/constants.js';
import { useCallback } from '~/libs/hooks/hooks.js';

type Properties = {
  onClose: () => void;
};

const useModal = ({
  onClose,
}: Properties): {
  handleOutsideClick: React.MouseEventHandler;
  handleDisableContentContainerClick: React.MouseEventHandler;
  handleExitKeydown: React.KeyboardEventHandler;
} => {
  const handleOutsideClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleExitKeydown: React.KeyboardEventHandler = useCallback(
    (event) => {
      if (event.key === EXIT_BUTTON) {
        onClose();
      }
    },
    [onClose],
  );

  const handleDisableContentContainerClick: React.MouseEventHandler =
    useCallback((event) => {
      event.stopPropagation();
    }, []);

  return {
    handleOutsideClick,
    handleDisableContentContainerClick,
    handleExitKeydown,
  };
};

export { useModal };
