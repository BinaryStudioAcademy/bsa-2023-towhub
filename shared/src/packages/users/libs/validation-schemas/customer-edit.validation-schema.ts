import joi from 'joi';

import { type UserCommonDetails } from '../types/types.js';
import { commonEditRules } from './common-rules/common-rules.js';

const customerEdit = joi.object<UserCommonDetails, true>(commonEditRules);

export { customerEdit };
