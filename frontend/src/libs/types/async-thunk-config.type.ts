import { type HttpError } from '~/libs/packages/http/libs/exceptions/exceptions.js';
import { type store } from '~/libs/packages/store/store.js';

type AsyncThunkConfig = {
  state: ReturnType<typeof store.instance.getState>;
  dispatch: typeof store.instance.dispatch;
  extra: typeof store.extraArguments;
  rejectValue: HttpError;
};

export { type AsyncThunkConfig };
