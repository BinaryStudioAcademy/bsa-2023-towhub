import { capitalizeFirstLetter } from '~/libs/helpers/helpers.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

import { orderStatusOptions } from '../options/order-status-options.js';

const getFilterByLabel = (label: string | null): SelectOption | undefined => {
  const [any, pending, done, canceled] = orderStatusOptions;

  if (!label) {
    return any;
  }

  switch (capitalizeFirstLetter(label)) {
    case pending.label: {
      return pending;
    }
    case done.label: {
      return done;
    }
    case canceled.label: {
      return canceled;
    }
    default: {
      return any;
    }
  }
};

export { getFilterByLabel };
