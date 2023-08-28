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
      if (event.key === 'Escape') {
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
