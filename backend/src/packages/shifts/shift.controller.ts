import { type ShiftCloseRequestDto } from 'shared/build/index.js';
import { ApiPath, HttpCode } from 'src/libs/enums/enums.js';

import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { AuthStrategy } from '../auth/auth.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import {
  type ShiftCreateRequestDto,
  type ShiftCreateResponseDto,
  type ShiftEntity,
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
      authStrategy: AuthStrategy.VERIFY_JWT,
      handler: () => this.getAllStarted(),
    });

    this.addRoute({
      path: ShiftsApiPath.ROOT,
      method: 'POST',
      authStrategy: [
        AuthStrategy.INJECT_USER,
        AuthStrategy.VERIFY_DRIVER_GROUP,
      ],
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
      authStrategy: [
        AuthStrategy.INJECT_USER,
        AuthStrategy.VERIFY_DRIVER_GROUP,
      ],
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
      authStrategy: [
        AuthStrategy.INJECT_USER,
        AuthStrategy.VERIFY_DRIVER_GROUP,
      ],
      handler: (options) =>
        this.getByShiftId(
          options as ApiHandlerOptions<{
            user: UserEntityObjectWithGroupT;
            params: Pick<ShiftEntity, 'id'>;
          }>,
        ),
    });

    this.addRoute({
      path: ShiftsApiPath.$DRIVER_ID,
      method: 'GET',
      authStrategy: [
        AuthStrategy.INJECT_USER,
        AuthStrategy.VERIFY_DRIVER_GROUP,
      ],
      handler: (options) =>
        this.getByDriver(
          options as ApiHandlerOptions<{
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });
  }

  private async getAllStarted(): Promise<
    ApiHandlerResponse<ShiftCreateResponseDto[]>
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
  ): Promise<ApiHandlerResponse<ShiftCreateResponseDto>> {
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
  ): Promise<ApiHandlerResponse<ShiftCreateResponseDto>> {
    return {
      status: HttpCode.OK,
      payload: await this.shiftService.close(options),
    };
  }

  private async getByShiftId(
    options: ApiHandlerOptions<{
      user: UserEntityObjectWithGroupT;
      params: Pick<ShiftEntity, 'id'>;
    }>,
  ): Promise<ApiHandlerResponse<ShiftCreateResponseDto>> {
    return {
      status: HttpCode.OK,
      payload: await this.shiftService.findByShiftId(
        options.params.id,
        options.user.id,
      ),
    };
  }

  private async getByDriver(
    options: ApiHandlerOptions<{
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse<ShiftCreateResponseDto[]>> {
    return {
      status: HttpCode.OK,
      payload: await this.shiftService.findByDriverUserId(options.user.id),
    };
  }
}

export { ShiftController };
