import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  type UserMocked,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type BusinessService } from './business.service.js';
import { BusinessApiPath } from './libs/enums/enums.js';
import {
  type BusinessAddRequestDto,
  type BusinessDeleteRequestParameters,
  type BusinessGetRequestParameters,
  type BusinessUpdateRequestDto,
  type BusinessUpdateRequestParameters,
} from './libs/types/types.js';
import {
  businessAddRequestBody,
  businessDeleteParameters,
  businessGetParameters,
  businessUpdateParameters,
  businessUpdateRequestBody,
} from './libs/validation-schemas/validation-schemas.js';

/**
 * @swagger
 * tags:
 *   name: business
 *   description: Business API
 * components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *    schemas:
 *      ErrorType:
 *        type: object
 *        properties:
 *          errorType:
 *            type: string
 *            example: COMMON
 *            enum:
 *             - COMMON
 *             - VALIDATION
 *
 *      BusinessAlreadyExists:
 *        allOf:
 *          - $ref: '#/components/schemas/ErrorType'
 *          - type: object
 *            properties:
 *              message:
 *                type: string
 *                enum:
 *                 - Owner already has business!
 *      TaxNumberAlreadyRegistered:
 *        allOf:
 *          - $ref: '#/components/schemas/ErrorType'
 *          - type: object
 *            properties:
 *              message:
 *                type: string
 *                enum:
 *                 - Business with such tax number already exists!
 *      NameAlreadyRegistered:
 *        allOf:
 *          - $ref: '#/components/schemas/ErrorType'
 *          - type: object
 *            properties:
 *              message:
 *                type: string
 *                enum:
 *                 - Business with such name already exists!
 *      InvalidUserGroup:
 *        allOf:
 *          - $ref: '#/components/schemas/ErrorType'
 *          - type: object
 *            properties:
 *              message:
 *                type: string
 *                enum:
 *                 - User of the group cannot create business!
 *      BusinessDoesNotExist:
 *        allOf:
 *          - $ref: '#/components/schemas/ErrorType'
 *          - type: object
 *            properties:
 *              message:
 *                type: string
 *                enum:
 *                 - Business does not exist!
 *
 *      BusinessDeletionResult:
 *        type: object
 *        required:
 *          - result
 *        properties:
 *          result:
 *            type: boolean
 *            example: true
 *            description: true, if deletion successful
 *
 *      BusinessFindResult:
 *        type: object
 *        properties:
 *          result:
 *            oneOf:
 *              - $ref: '#/components/schemas/Business'
 *            nullable: true
 *
 *      Business:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          companyName:
 *            type: string
 *            minLength: 1
 *            example: Tow Inc.
 *          taxNumber:
 *            type: string
 *            pattern: ^\d{10}$
 *            description: Consists of 10 digits
 *            example: 1234567890
 *          ownerId:
 *            type: number
 *            format: number
 *            minimum: 1
 *            description: User id to which the business belongs
 *            example: 1
 * security:
 *   - bearerAuth: []
 */
class BusinessController extends Controller {
  private businessService: BusinessService;

  public constructor(logger: ILogger, businessService: BusinessService) {
    super(logger, ApiPath.BUSINESS);

    this.businessService = businessService;

    this.addRoute({
      path: BusinessApiPath.ROOT,
      method: 'POST',
      validation: {
        body: businessAddRequestBody,
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
      method: 'PUT',
      validation: {
        body: businessUpdateRequestBody,
        params: businessUpdateParameters,
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
      method: 'DELETE',
      validation: {
        params: businessDeleteParameters,
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
      method: 'GET',
      validation: {
        params: businessGetParameters,
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

  /**
   * @swagger
   * /business/:
   *    post:
   *      tags:
   *       - business
   *      summary: Create business
   *      description: Create business
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *               - companyName
   *               - taxNumber
   *              properties:
   *                companyName:
   *                  $ref: '#/components/schemas/Business/properties/companyName'
   *                taxNumber:
   *                  $ref: '#/components/schemas/Business/properties/taxNumber'
   *      responses:
   *        201:
   *          description: Successful business creation.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Business'
   *        400:
   *          description:
   *            User is not of 'Business' group, or already has business,
   *            or business with such name and/or tax number already exists
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/BusinessAlreadyExists'
   */
  private async create(
    options: ApiHandlerOptions<{
      body: BusinessAddRequestDto;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const createdBusiness = await this.businessService.create({
      payload: options.body,
      owner: options.user,
    });

    return {
      status: HttpCode.CREATED,
      payload: createdBusiness,
    };
  }

  /**
   * @swagger
   * /business/{id}:
   *    put:
   *      tags:
   *       - business
   *      summary: Update business
   *      description: Update business
   *      parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the business to update
   *         example: 1
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *               - companyName
   *              properties:
   *                companyName:
   *                  $ref: '#/components/schemas/Business/properties/companyName'
   *      responses:
   *        200:
   *          description: Successful business update.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Business'
   *        400:
   *          description:
   *            Business with such ID does not exist or name is already registered
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/BusinessDoesNotExist'
   */
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

  /**
   * @swagger
   * /business/{id}:
   *    delete:
   *      tags:
   *       - business
   *      summary: Delete business
   *      description: Delete business
   *      parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the business to delete
   *         example: 1
   *      responses:
   *        200:
   *          description: Successful business deletion.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/BusinessDeletionResult'
   *        400:
   *          description:
   *            Business with such ID does not exist
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/BusinessDoesNotExist'
   *
   */
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

  /**
   * @swagger
   * /business/{id}:
   *    get:
   *      tags:
   *       - business
   *      summary: Find business
   *      description: Find business
   *      parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the business to get
   *         example: 1
   *      responses:
   *        200:
   *          description: Find operation had no errors.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/BusinessFindResult'
   */
  private async find(
    options: ApiHandlerOptions<{
      params: BusinessGetRequestParameters;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const findBusinessById = await this.businessService.find(options.params.id);

    return {
      status: HttpCode.OK,
      payload: findBusinessById,
    };
  }
}

export { BusinessController };
