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

    // this.addRoute({
    //   path: TruckApiPath.$ID,
    //   method: 'PUT',
    //   validation: {
    //     body: truckUpdateRequestBody,
    //     params: truckGetParameters,
    //   },
    //   handler: (options) =>
    //     this.update(
    //       options as ApiHandlerOptions<{
    //         body: Partial<TruckEntity>;
    //         params: { id: number };
    //       }>,
    //     ),
    // });
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

  // private async update(
  //   options: ApiHandlerOptions<{
  //     body: Partial<TruckEntity>;
  //     params: { id: number };
  //   }>,
  // ): Promise<ApiHandlerResponse> {
  //   const { params, body } = options;

  //   const updatedTruck = await this.truckService.update(params.id, body);

  //   return {
  //     status: HttpCode.OK,
  //     payload: updatedTruck,
  //   };
  // }

  // private async getAll(): Promise<ApiHandlerResponse> {
  //   return {
  //     status: HttpCode.OK,
  //     payload: await this.truckService.getAll(),
  //   };
  // }

  // private async get(
  //   options: ApiHandlerOptions<{
  //     params: { id: number };
  //   }>,
  // ): Promise<ApiHandlerResponse> {
  //   return {
  //     status: HttpCode.OK,
  //     payload: await this.truckService.findById(options.params.id),
  //   };
  // }

  // private async delete(
  //   options: ApiHandlerOptions<{
  //     params: { id: number };
  //   }>,
  // ): Promise<ApiHandlerResponse> {
  //   return {
  //     status: HttpCode.NO_CONTENT,
  //     payload: await this.truckService.delete(options.params.id),
  //   };
  // }
}

export { ShiftController };
