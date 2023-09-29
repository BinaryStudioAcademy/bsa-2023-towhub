import { type DriverInfo } from './order-entity.type.js';
import { type OrderResponseDto } from './order-response-dto.type.js';

type OrderResponseWithAvatarDto = OrderResponseDto & {
  shift: { driver: (DriverInfo & { avatarUrl: string | null }) | null };
};

export { type OrderResponseWithAvatarDto };
