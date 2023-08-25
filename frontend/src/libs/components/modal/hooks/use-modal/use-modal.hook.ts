import { useCallback } from '~/libs/hooks/hooks.js';

type Properties = {
  onClose: () => void;
};

const useModal = ({
  onClose,
}: Properties): {
  handleOutsideClick: React.MouseEventHandler<HTMLDivElement>;
  handleDisableContentContainerClick: React.MouseEventHandler<HTMLDivElement>;
} => {
  const handleOutsideClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleDisableContentContainerClick: React.MouseEventHandler<HTMLDivElement> =
    useCallback((event) => {
      event.stopPropagation();
    }, []);

  return {
    handleOutsideClick,
    handleDisableContentContainerClick,
  };
};

export { useModal };
