import { ApiPath, HttpCode } from 'src/libs/enums/enums.js';

import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { AuthStrategy } from '../auth/auth.js';
import {
  type UserEntityObjectWithGroupT,
  type UserEntityT,
} from '../users/users.js';
import {
  type ShiftCloseRequestDto,
  type ShiftCreateRequestDto,
  type ShiftEntity,
  type ShiftResponseDto,
  shiftCloseValidationSchema,
  shiftCreateValidationSchema,
  ShiftsApiPath,
} from './shift.js';
import { type ShiftService } from './shift.service.js';

class ShiftController extends Controller {
  private shiftService: ShiftService;

  public constructor(logger: ILogger, shiftService: ShiftService) {
    super(logger, ApiPath.SHIFTS);

    this.shiftService = shiftService;

    this.addRoute({
      path: ShiftsApiPath.ROOT,
      method: 'GET',
      handler: () => this.getAllStarted(),
    });

    this.addRoute({
      path: ShiftsApiPath.ROOT,
      method: 'POST',
      authStrategy: AuthStrategy.INJECT_USER,
      validation: {
        body: shiftCreateValidationSchema,
      },
      handler: (options) =>
        this.startShift(
          options as ApiHandlerOptions<{
            body: ShiftCreateRequestDto;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: ShiftsApiPath.$ID,
      method: 'PUT',
      authStrategy: AuthStrategy.INJECT_USER,
      validation: {
        body: shiftCloseValidationSchema,
      },
      handler: (options) =>
        this.closeShift(
          options as ApiHandlerOptions<{
            body: ShiftCloseRequestDto;
            user: UserEntityObjectWithGroupT;
            params: Pick<ShiftEntity, 'id'>;
          }>,
        ),
    });

    this.addRoute({
      path: ShiftsApiPath.$ID,
      method: 'GET',
      handler: (options) =>
        this.getByShiftId(
          options as ApiHandlerOptions<{
            params: Pick<ShiftEntity, 'id'>;
          }>,
        ),
    });

    this.addRoute({
      path: ShiftsApiPath.DRIVER_$ID + ShiftsApiPath.$ID,
      method: 'GET',
      handler: (options) =>
        this.getByDriver(
          options as ApiHandlerOptions<{
            params: Pick<UserEntityT, 'id'>;
          }>,
        ),
    });
  }

  private async getAllStarted(): Promise<
    ApiHandlerResponse<ShiftResponseDto[]>
  > {
    return {
      status: HttpCode.OK,
      payload: await this.shiftService.getAllStarted(),
    };
  }

  private async startShift(
    options: ApiHandlerOptions<{
      body: ShiftCreateRequestDto;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse<ShiftResponseDto>> {
    return {
      status: HttpCode.CREATED,
      payload: await this.shiftService.create(options),
    };
  }

  private async closeShift(
    options: ApiHandlerOptions<{
      body: ShiftCloseRequestDto;
      user: UserEntityObjectWithGroupT;
      params: Pick<ShiftEntity, 'id'>;
    }>,
  ): Promise<ApiHandlerResponse<ShiftResponseDto>> {
    return {
      status: HttpCode.OK,
      payload: await this.shiftService.close(options),
    };
  }

  private async getByShiftId(
    options: ApiHandlerOptions<{
      params: Pick<ShiftEntity, 'id'>;
    }>,
  ): Promise<ApiHandlerResponse<ShiftResponseDto>> {
    return {
      status: HttpCode.OK,
      payload: await this.shiftService.findByShiftId(options.params.id),
    };
  }

  private async getByDriver(
    options: ApiHandlerOptions<{
      params: Pick<UserEntityT, 'id'>;
    }>,
  ): Promise<ApiHandlerResponse<ShiftResponseDto[]>> {
    return {
      status: HttpCode.OK,
      payload: await this.shiftService.findByDriverUserId(options.params.id),
    };
  }
}

export { ShiftController };
