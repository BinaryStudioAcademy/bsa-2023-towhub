import { ApiPath, HttpMethod } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { type UserMocked } from '~/libs/packages/controller/libs/types/api-handler-options.type.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type BusinessService } from '~/packages/business/business.service.js';

import { BusinessApiPath } from './libs/enums/enums.js';
import {
  type BusinessAddRequestDto,
  type BusinessDeleteRequestParameters,
  type BusinessGetRequestParameters,
  type BusinessUpdateRequestDto,
  type BusinessUpdateRequestParameters,
} from './libs/types/types.js';
import {
  businessAddDtoValidationSchema,
  businessDeleteParametersValidationSchema,
  businessGetParametersValidationSchema,
  businessUpdateDtoValidationSchema,
  businessUpdateParametersValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';

class BusinessController extends Controller {
  private businessService: BusinessService;

  public constructor(logger: ILogger, businessService: BusinessService) {
    super(logger, ApiPath.BUSINESS);

    this.businessService = businessService;

    this.addRoute({
      path: BusinessApiPath.ROOT,
      method: HttpMethod.POST,
      validation: {
        body: businessAddDtoValidationSchema,
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            body: BusinessAddRequestDto;
            user: UserMocked;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.$ID,
      method: HttpMethod.PUT,
      validation: {
        body: businessUpdateDtoValidationSchema,
        params: businessUpdateParametersValidationSchema,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: BusinessUpdateRequestDto;
            params: BusinessUpdateRequestParameters;
            user: UserMocked;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.$ID,
      method: HttpMethod.DELETE,
      validation: {
        params: businessDeleteParametersValidationSchema,
      },
      handler: (options) =>
        this.delete(
          options as ApiHandlerOptions<{
            params: BusinessDeleteRequestParameters;
            user: UserMocked;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.$ID,
      method: HttpMethod.GET,
      validation: {
        params: businessGetParametersValidationSchema,
      },
      handler: (options) =>
        this.find(
          options as ApiHandlerOptions<{
            params: BusinessGetRequestParameters;
            user: UserMocked;
          }>,
        ),
    });
  }

  private async create(
    options: ApiHandlerOptions<{
      body: BusinessAddRequestDto;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const payload = {
      taxNumber: options.body.taxNumber,
      companyName: options.body.companyName,
      ownerId: options.user.id,
    };

    const createdBusiness = await this.businessService.create({
      payload,
      owner: options.user,
    });

    return {
      status: HttpCode.CREATED,
      payload: createdBusiness,
    };
  }

  private async update(
    options: ApiHandlerOptions<{
      body: BusinessUpdateRequestDto;
      params: BusinessUpdateRequestParameters;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const updatedBusiness = await this.businessService.update({
      id: options.params.id,
      payload: options.body,
    });

    return {
      status: HttpCode.OK,
      payload: updatedBusiness,
    };
  }

  private async delete(
    options: ApiHandlerOptions<{
      params: BusinessDeleteRequestParameters;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const deletionResult = await this.businessService.delete(options.params.id);

    return {
      status: HttpCode.OK,
      payload: deletionResult,
    };
  }

  private async find(
    options: ApiHandlerOptions<{
      params: BusinessGetRequestParameters;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const business = await this.businessService.find(options.params.id);

    return {
      status: HttpCode.OK,
      payload: business,
    };
  }
}

export { BusinessController };
