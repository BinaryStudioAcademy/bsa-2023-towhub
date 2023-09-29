import { AppRoute } from '~/libs/enums/enums.js';
import { useCallback, useNavigate } from '~/libs/hooks/hooks.js';
import {
  type BusinessSignUpResponseDto,
  type CustomerSignUpResponseDto,
  type UserSignInResponseDto,
} from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

type AuthNavigateHook = {
  navigateAuthUser: (
    user:
      | UserSignInResponseDto
      | CustomerSignUpResponseDto
      | BusinessSignUpResponseDto,
  ) => void;
};

const useAuthNavigate = (): AuthNavigateHook => {
  const navigate = useNavigate();

  const navigateAuthUser = useCallback(
    (
      user:
        | UserSignInResponseDto
        | CustomerSignUpResponseDto
        | BusinessSignUpResponseDto,
    ): void => {
      switch (user.group.key) {
        case UserGroupKey.BUSINESS: {
          navigate(AppRoute.DASHBOARD_ORDERS);
          break;
        }
        case UserGroupKey.CUSTOMER: {
          navigate(AppRoute.ROOT);
          break;
        }
        case UserGroupKey.DRIVER: {
          navigate(AppRoute.AVAILABLE_TRUCKS);
          break;
        }
        default: {
          break;
        }
      }
    },
    [navigate],
  );

  return { navigateAuthUser };
};

export { useAuthNavigate };
