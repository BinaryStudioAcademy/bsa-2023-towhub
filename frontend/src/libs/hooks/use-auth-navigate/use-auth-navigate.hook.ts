import { AppRoute } from '~/libs/enums/enums.js';
import { useNavigate } from '~/libs/hooks/hooks.js';
import { type UserSignInResponseDto } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

type AuthNavigateHook = {
  navigateAuthUser: (user: UserSignInResponseDto) => void;
};

const useAuthNavigate = (): AuthNavigateHook => {
  const navigate = useNavigate();

  const navigateAuthUser = (user: UserSignInResponseDto): void => {
    switch (user.group.key) {
      case UserGroupKey.BUSINESS: {
        navigate(AppRoute.DASHBOARD);
        break;
      }
      case UserGroupKey.CUSTOMER: {
        break;
      }
      case UserGroupKey.DRIVER: {
        break;
      }
      default: {
        break;
      }
    }
  };

  return { navigateAuthUser };
};

export { useAuthNavigate };
