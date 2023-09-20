import { AppRoute } from '~/libs/enums/enums.js';

const checkActiveTab = (path: string, tab: string): boolean => {
  return path === `${AppRoute.DASHBOARD}/${tab}`;
};

export { checkActiveTab };
