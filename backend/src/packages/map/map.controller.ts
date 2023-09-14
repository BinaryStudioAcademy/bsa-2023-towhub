import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { AuthStrategy } from '../auth/auth.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { MapApiPath } from './libs/enums/enums.js';
import { type MapService } from './map.service.js';

class MapController extends Controller {
  private mapService: MapService;

  public constructor({
    logger,
    mapService,
  }: {
    logger: ILogger;
    mapService: MapService;
  }) {
    super(logger, ApiPath.MAP);

    this.mapService = mapService;

    this.addRoute({
      path: MapApiPath.ROOT,
      method: 'POST',
      authStrategy: AuthStrategy.INJECT_USER,
      handler: (options) =>
        this.calculatePrice(
          options as ApiHandlerOptions<{
            // FIXME: MOVE TO SHARED
            body: { startPoint: string; endPoint: string; pricePerKm: number };
            user: UserEntityObjectWithGroupT | null;
          }>,
        ),
    });
  }

  private async calculatePrice(
    options: ApiHandlerOptions<{
      // FIXME: MOVE TO SHARED
      body: { startPoint: string; endPoint: string; pricePerKm: number };
      user: UserEntityObjectWithGroupT | null;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.mapService.getPriceByDistance({
        ...options.body,
      }),
    };
  }
}

export { MapController };
