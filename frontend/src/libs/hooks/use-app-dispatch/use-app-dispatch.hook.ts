import { useDispatch } from 'react-redux';

import { type AppDispatch } from '~/libs/packages/store/store.js';

const useAppDispatch = useDispatch<AppDispatch>;

export { useAppDispatch };
