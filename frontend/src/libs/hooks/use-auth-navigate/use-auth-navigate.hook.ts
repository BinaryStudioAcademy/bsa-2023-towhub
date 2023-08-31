import { type UserSignInResponseDto } from 'shared/build';

import { useNavigate } from '~/libs/hooks/hooks.js';

type AuthNavigateHook = {
  authNavigate: (user: UserSignInResponseDto) => void;
};

const useAuthNavigate = (): AuthNavigateHook => {
  const navigate = useNavigate();

  const authNavigate = (user: UserSignInResponseDto): void => {
    switch (user.group.key) {
      case 'business': {
        navigate('/dashboard');
        break;
      }
      case 'customer': {
        break;
      }
      case 'driver': {
        break;
      }
      default: {
        break;
      }
    }
  };

  return { authNavigate };
};

export { useAuthNavigate };
