import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector, useEffect, useNavigate } from '~/libs/hooks/hooks.js';
import { ShiftStatus } from '~/slices/driver/libs/enums/enums.js';
import { selectShiftStatus } from '~/slices/driver/selectors.js';

const Orders: React.FC = () => {
  const shiftStatus = useAppSelector(selectShiftStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (shiftStatus === ShiftStatus.DISABLED) {
      navigate(AppRoute.AVAILABLE_TRUCKS);
    }
  }, [shiftStatus, navigate]);

  return <div>Orders page</div>;
};

export { Orders };
