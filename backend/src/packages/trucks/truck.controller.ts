import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
} from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { TruckApiPath } from './libs/enums/enums.js';
import { type TruckAddRequestDto } from './libs/types/types.js';
import { truckAddValidationSchema } from './libs/validation-schema/validation-schemas.js';
import { type TruckService } from './truck.service.js';

class TruckController extends Controller {
  private truckService: TruckService;

  public constructor(logger: ILogger, truckService: TruckService) {
    super(logger, ApiPath.TRUCKS);

    this.truckService = truckService;

    this.addRoute({
      path: TruckApiPath.ROOT,
      method: 'POST',
      validation: {
        body: truckAddValidationSchema,
      },
      handler: (options) =>
        this.addTruck(
          options as ApiHandlerOptions<{
            body: TruckAddRequestDto;
          }>,
        ),
    });
  }

  private async addTruck(
    options: ApiHandlerOptions<{
      body: TruckAddRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.truckService.create(options.body),
    };
  }
}

export { TruckController };
