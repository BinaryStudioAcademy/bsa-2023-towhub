import { AppRoute } from '~/libs/enums/app-route.enum';

const checkActiveTab = (path: string, tab: string): boolean => {
  return path === `${AppRoute.DASHBOARD}/${tab}`;
};

export { checkActiveTab };
