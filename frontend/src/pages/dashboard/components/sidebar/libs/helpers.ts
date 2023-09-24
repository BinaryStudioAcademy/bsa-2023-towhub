// import { AppRoute } from '~/libs/enums/app-route.enum';

const checkActiveTab = (path: string, tab: string): boolean => {
  return path === tab;
};

export { checkActiveTab };
