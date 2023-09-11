import { useEffect } from '~/libs/hooks/hooks.js';

type Properties = {
  interval: number | null;
  onUpdateSuccess: PositionCallback;
  onUpdateError?: PositionErrorCallback;
};

const useGeolocation = ({
  interval,
  onUpdateSuccess: handleUpdateSuccess,
  onUpdateError: handleUpdateError,
}: Properties): void => {
  useEffect(() => {
    const { geolocation } = navigator;
    const getCurrentPositionBindArguments = (): void => {
      geolocation.getCurrentPosition(handleUpdateSuccess, handleUpdateError);
    };

    const timerId = interval
      ? setInterval(() => getCurrentPositionBindArguments(), interval)
      : setTimeout(() => getCurrentPositionBindArguments());

    return (): void => {
      interval ? clearInterval(timerId) : clearTimeout(timerId);
    };
  }, [handleUpdateSuccess, handleUpdateError, interval]);
};

export { useGeolocation };
