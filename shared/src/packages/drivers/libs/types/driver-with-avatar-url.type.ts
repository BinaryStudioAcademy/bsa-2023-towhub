import { type DriverEntityT } from './driver-entity.type.js';

type DriverWithAvatarUrl = DriverEntityT & { avatarUrl: string | null };

export { type DriverWithAvatarUrl };
