import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { AuthStrategy } from '~/packages/auth/libs/enums/enums.js';

import {
  type DriverCreateUpdateRequestDto,
  type DriverRequestParameters,
} from '../drivers/drivers.js';
import {
  driverCreateUpdateRequestBody,
  driverParameters,
} from '../drivers/libs/validation-schemas/validation-schemas.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { type BusinessService } from './business.service.js';
import { BusinessApiPath } from './libs/enums/enums.js';
import {
  type BusinessAddRequestDto,
  type BusinessDeleteRequestParameters,
  type BusinessGetRequestParameters,
  type BusinessUpdateRequestDto,
  type BusinessUpdateRequestParameters,
  type GetPaginatedPageQuery,
} from './libs/types/types.js';
import {
  businessAddRequestBody,
  businessDeleteParameters,
  businessGetParameters,
  businessUpdateParameters,
  businessUpdateRequestBody,
  commonGetPageQuery,
} from './libs/validation-schemas/validation-schemas.js';

/**
 * @swagger
 * tags:
 *   name: business
 *   description: Business API
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ErrorType:
 *       type: object
 *       properties:
 *         errorType:
 *           type: string
 *           example: COMMON
 *           enum:
 *             - COMMON
 *             - VALIDATION
 *     BusinessAlreadyExists:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Owner already has business!
 *     TaxNumberAlreadyRegistered:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Business with such tax number already exists!
 *     NameAlreadyRegistered:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Business with such name already exists!
 *     InvalidUserGroup:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - User of the group cannot create this!
 *     BusinessDoesNotExist:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Business does not exist!
 *     DriverAlreadyExists:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Owner already has this driver!
 *     DriverLicenseNumberAlreadyRegistered:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Driver with such license number already exists
 *     DriverDoesNotExist:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Driver does not exist!
 *     BusinessDeletionResult:
 *       type: object
 *       required:
 *         - result
 *       properties:
 *         result:
 *           type: boolean
 *           example: true
 *           description: true, if deletion successful
 *     AllDriverFindResult:
 *       type: array
 *       properties:
 *         result:
 *           allOf:
 *             - $ref: '#/components/schemas/Driver'
 *           nullable: true
 *     DriverDeletionResult:
 *       type: object
 *       required:
 *         - result
 *       properties:
 *         result:
 *           type: boolean
 *           example: true
 *           description: true, if deletion successful
 *     DriverFindResult:
 *       type: object
 *       properties:
 *         result:
 *           oneOf:
 *             - $ref: '#/components/schemas/Driver'
 *           nullable: true
 *     Business:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: number
 *           minimum: 1
 *         companyName:
 *           type: string
 *           minLength: 1
 *           example: Tow Inc.
 *         taxNumber:
 *           type: string
 *           pattern: ^\d{10}$
 *           description: Consists of 10 digits
 *           example: 1234567890
 *         ownerId:
 *           type: number
 *           format: number
 *           minimum: 1
 *           description: User id to which the business belongs
 *           example: 1
 *     BusinessFindResult:
 *       allOf:
 *         - $ref: '#/components/schemas/Business'
 *       nullable: true
 *     Driver:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: number
 *           minimum: 1
 *         phone:
 *           type: string
 *           pattern: /^\+\d{8,19}$/
 *           example: +380988000777
 *         email:
 *           type: string
 *           format: email
 *           minLength: 5
 *           maxLength: 254
 *         firstName:
 *           type: string
 *           minLength: 1
 *           maxLength: 40
 *           pattern: ^['A-Za-z-]{1,40}$
 *           example: Bob
 *         lastName:
 *           type: string
 *           minLength: 1
 *           maxLength: 40
 *           pattern: ^['A-Za-z-]{1,40}$
 *           example: Sponge
 *         groupId:
 *           type: number
 *           format: number
 *           minimum: 1
 *           description: Group id to which the driver belomgs
 *           example: 1
 *         driver:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: number
 *               minimum: 1
 *             driverLicenseNumber:
 *               type: string
 *               minLength: 10
 *               example: AAA 123456
 *             userId:
 *               type: number
 *               format: number
 *               minimum: 1
 *               description: User id to which the driver belongs
 *               example: 1
 *             businessId:
 *               type: number
 *               format: number
 *               minimum: 1
 *               description: Business id to which the driver belongs
 *               example: 1
 * security:
 *   - bearerAuth: []
 */
class BusinessController extends Controller {
  private businessService: BusinessService;

  public constructor(logger: ILogger, businessService: BusinessService) {
    const defaultStrategies = [
      AuthStrategy.VERIFY_JWT,
      AuthStrategy.VERIFY_BUSINESS_GROUP,
    ];

    super(logger, ApiPath.BUSINESS, defaultStrategies);

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
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.DRIVERS,
      method: 'POST',
      authStrategy: defaultStrategies,
      validation: {
        body: driverCreateUpdateRequestBody,
      },
      handler: (options) =>
        this.createDriver(
          options as ApiHandlerOptions<{
            body: DriverCreateUpdateRequestDto;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.DRIVER_$ID,
      method: 'PUT',
      authStrategy: defaultStrategies,
      validation: {
        body: driverCreateUpdateRequestBody,
        params: driverParameters,
      },
      handler: (options) =>
        this.updateDriver(
          options as ApiHandlerOptions<{
            body: DriverCreateUpdateRequestDto;
            params: DriverRequestParameters;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.DRIVERS,
      method: 'GET',
      authStrategy: defaultStrategies,
      validation: {
        query: commonGetPageQuery,
      },
      handler: (options) =>
        this.findAllDrivers(
          options as ApiHandlerOptions<{
            query: GetPaginatedPageQuery;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.DRIVER_$ID,
      method: 'DELETE',
      authStrategy: defaultStrategies,
      validation: {
        params: driverParameters,
      },
      handler: (options) =>
        this.deleteDriver(
          options as ApiHandlerOptions<{
            params: DriverRequestParameters;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.TRUCKS,
      method: 'GET',
      authStrategy: defaultStrategies,

      handler: (options) =>
        this.findAllTrucks(
          options as ApiHandlerOptions<{
            query: GetPaginatedPageQuery;
            user: UserEntityObjectWithGroupT;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /business/:
   *    post:
   *      security:
   *        - bearerAuth: []
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
   *      security:
   *        - bearerAuth: []
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
   *      security:
   *        - bearerAuth: []
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
    }>,
  ): Promise<ApiHandlerResponse> {
    const deletionResult = await this.businessService.delete(options.params.id);

    return {
      status: HttpCode.OK,
      payload: { result: deletionResult },
    };
  }

  /**
   * @swagger
   * /business/{id}:
   *    get:
   *      security:
   *        - bearerAuth: []
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
    }>,
  ): Promise<ApiHandlerResponse> {
    const findBusinessById = await this.businessService.findById(
      options.params.id,
    );

    return {
      status: HttpCode.OK,
      payload: { result: findBusinessById },
    };
  }

  /**
   * @swagger
   * /business/drivers:
   *    post:
   *      tags:
   *       - business/driver
   *      summary: Create driver
   *      description: Create driver
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *               - phone
   *               - email
   *               - firstName
   *               - lastName
   *               - driverLicenseNumber
   *               - password
   *               - driverTrucks
   *              properties:
   *                phone:
   *                  $ref: '#/components/schemas/Driver/properties/phone'
   *                email:
   *                  $ref: '#/components/schemas/Driver/properties/email'
   *                firstName:
   *                  $ref: '#/components/schemas/Driver/properties/firstName'
   *                lastName:
   *                  $ref: '#/components/schemas/Driver/properties/lastName'
   *                driverLicenseNumber:
   *                  $ref: '#/components/schemas/Driver/properties/driver/properties/driverLicenseNumber'
   *                password:
   *                  type: string
   *                  minimum: 6
   *                  maximum: 20
   *                  pattern: ^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{6,20}$
   *                driverTrucks:
   *                  type: array
   *                  items:
   *                    type: number
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        201:
   *          description: Successful driver creation.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Driver'
   *        400:
   *          description:
   *            User is not of 'Business' group, or already driver exists,
   *            or driver with such driver license number already exists
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/DriverAlreadyExists'
   */

  private async createDriver(
    options: ApiHandlerOptions<{
      body: DriverCreateUpdateRequestDto;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    const createdDriver = await this.businessService.createDriver(
      options.body,
      options.user.id,
    );

    return {
      status: HttpCode.CREATED,
      payload: createdDriver,
    };
  }

  /**
   * @swagger
   * /business/driver/{driverId}:
   *    put:
   *      tags:
   *       - business/driver
   *      summary: Update driver
   *      description: Update driver
   *      parameters:
   *       - in: path
   *         name: driverId
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the driver to update
   *         example: 1
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                phone:
   *                  $ref: '#/components/schemas/Driver/properties/phone'
   *                email:
   *                  $ref: '#/components/schemas/Driver/properties/email'
   *                firstName:
   *                   $ref: '#/components/schemas/Driver/properties/firstName'
   *                lastName:
   *                  $ref: '#/components/schemas/Driver/properties/lastName'
   *                driverLicenseNumber:
   *                  $ref: '#/components/schemas/Driver/properties/driver/properties/driverLicenseNumber'
   *                password:
   *                  type: string
   *                  minimum: 6
   *                  maximum: 20
   *                  pattern: ^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{6,20}$
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful driver update.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Driver'
   *        400:
   *          description:
   *            Driver with such ID does not exist or driver license number is already registered
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/DriverDoesNotExist'
   */

  private async updateDriver(
    options: ApiHandlerOptions<{
      body: DriverCreateUpdateRequestDto;
      params: DriverRequestParameters;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    const updatedDriver = await this.businessService.updateDriver(
      options.body,
      options.params.driverId,
      options.user.id,
    );

    return {
      status: HttpCode.OK,
      payload: updatedDriver,
    };
  }

  /**
   * @swagger
   * /business/drivers:
   *    get:
   *      tags:
   *       - business/driver
   *      summary: Find all drivers
   *      description: Find all drivers
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful find all drivers
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                    items:
   *                      type: array
   *                      items:
   *                        $ref: '#/components/schemas/Driver'
   *                    total:
   *                      type: string
   *                      example: 1
   *
   */

  private async findAllDrivers(
    options: ApiHandlerOptions<{
      query: GetPaginatedPageQuery;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    const drivers = await this.businessService.findAllDriversByBusinessId(
      options.user.id,
      options.query,
    );

    return {
      status: HttpCode.OK,
      payload: drivers,
    };
  }

  /**
   * @swagger
   * /business/driver/{driverId}:
   *    delete:
   *      tags:
   *       - business/driver
   *      summary: Delete driver
   *      description: Delete driver
   *      parameters:
   *       - in: path
   *         name: driverId
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the driver to delete
   *         example: 1
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful driver deletion.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/DriverDeletionResult'
   *        400:
   *          description:
   *            Driver with such ID does not exist
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/DriverDoesNotExist'
   *
   */

  private async deleteDriver(
    options: ApiHandlerOptions<{
      params: DriverRequestParameters;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    const deletionResult = await this.businessService.deleteDriver(
      options.params.driverId,
      options.user.id,
    );

    return {
      status: HttpCode.OK,
      payload: deletionResult,
    };
  }

  /**
   * @swagger
   * /business/trucks:
   *    get:
   *      tags:
   *       - business/trucks
   *      summary: Find all trucks
   *      description: Find all trucks
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful find all trucks
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/TruckResponse'
   */

  private async findAllTrucks(
    options: ApiHandlerOptions<{
      query: GetPaginatedPageQuery;
      user: UserEntityObjectWithGroupT;
    }>,
  ): Promise<ApiHandlerResponse> {
    const trucks = await this.businessService.findAllTrucksByOwnerId(
      options.user.id,
      options.query,
    );

    return {
      status: HttpCode.OK,
      payload: trucks,
    };
  }
}

export { BusinessController };
