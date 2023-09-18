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
  type BusinessGetAllDriversRequestParameters,
  type DriverCreateUpdateRequestDto,
  type DriverUpdateDeleteRequestParameters,
} from '../drivers/drivers.js';
import {
  driverCreateUpdateRequestBody,
  driverGetParameters,
  driverUpdateDeleteParameters,
} from '../drivers/libs/validation-schemas/validation-schemas.js';
import { type BusinessService } from './business.service.js';
import { BusinessApiPath } from './libs/enums/enums.js';
import {
  type BusinessAddRequestDto,
  type BusinessUpdateRequestDto,
} from './libs/types/types.js';
import {
  businessAddRequestBody,
  businessUpdateRequestBody,
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
      path: BusinessApiPath.ROOT,
      method: 'PUT',
      validation: {
        body: businessUpdateRequestBody,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: BusinessUpdateRequestDto;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.ROOT,
      method: 'DELETE',
      handler: (options) => this.delete(options),
    });

    this.addRoute({
      path: BusinessApiPath.ROOT,
      method: 'GET',
      handler: (options) => this.find(options),
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
            params: { businessId: number };
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.DRIVER_$ID,
      method: 'PUT',
      authStrategy: defaultStrategies,
      validation: {
        body: driverCreateUpdateRequestBody,
        params: driverUpdateDeleteParameters,
      },
      handler: (options) =>
        this.updateDriver(
          options as ApiHandlerOptions<{
            body: DriverCreateUpdateRequestDto;
            params: DriverUpdateDeleteRequestParameters;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.DRIVERS,
      method: 'GET',
      authStrategy: defaultStrategies,
      validation: {
        params: driverGetParameters,
      },
      handler: (options) =>
        this.findAllDrivers(
          options as ApiHandlerOptions<{
            params: BusinessGetAllDriversRequestParameters;
          }>,
        ),
    });

    this.addRoute({
      path: BusinessApiPath.DRIVER_$ID,
      method: 'DELETE',
      authStrategy: defaultStrategies,
      validation: {
        params: driverUpdateDeleteParameters,
      },
      handler: (options) =>
        this.deleteDriver(
          options as ApiHandlerOptions<{
            params: DriverUpdateDeleteRequestParameters;
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
   * /business:
   *    put:
   *      tags:
   *       - business
   *      summary: Update business
   *      description: Update business
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
    }>,
  ): Promise<ApiHandlerResponse> {
    const updatedBusiness = await this.businessService.update({
      payload: options.body,
      owner: options.user,
    });

    return {
      status: HttpCode.OK,
      payload: updatedBusiness,
    };
  }

  /**
   * @swagger
   * /business:
   *    delete:
   *      tags:
   *       - business
   *      summary: Delete business
   *      description: Delete business
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
    options: ApiHandlerOptions,
  ): Promise<ApiHandlerResponse> {
    const deletionResult = await this.businessService.delete(options.user);

    return {
      status: HttpCode.OK,
      payload: { result: deletionResult },
    };
  }

  /**
   * @swagger
   * /business:
   *    get:
   *      tags:
   *       - business
   *      summary: Find business
   *      description: Find business
   *      responses:
   *        200:
   *          description: Find operation had no errors.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/BusinessFindResult'
   */
  private async find(options: ApiHandlerOptions): Promise<ApiHandlerResponse> {
    const findBusinessByOwnerId = await this.businessService.findByOwnerId(
      options.user.id,
    );

    return {
      status: HttpCode.OK,
      payload: { result: findBusinessByOwnerId },
    };
  }

  /**
   * @swagger
   * /business/{businessId}/drivers:
   *    post:
   *      tags:
   *       - business/driver
   *      summary: Create driver
   *      description: Create driver
   *      parameters:
   *       - in: path
   *         name: businessId
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the business to create driver
   *         example: 1
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
      params: { businessId: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    const createdDriver = await this.businessService.createDriver({
      payload: options.body,
      businessId: options.params.businessId,
      owner: options.user,
    });

    return {
      status: HttpCode.CREATED,
      payload: createdDriver,
    };
  }

  /**
   * @swagger
   * /business/{businessId}/driver/{driverId}:
   *    put:
   *      tags:
   *       - business/driver
   *      summary: Update driver
   *      description: Update driver
   *      parameters:
   *       - in: path
   *         name: businessId
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the business to update drivers
   *         example: 1
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
      params: DriverUpdateDeleteRequestParameters;
    }>,
  ): Promise<ApiHandlerResponse> {
    const updatedDriver = await this.businessService.updateDriver({
      driverId: options.params.driverId,
      payload: options.body,
    });

    return {
      status: HttpCode.OK,
      payload: updatedDriver,
    };
  }

  /**
   * @swagger
   * /business/{businessId}/drivers:
   *    get:
   *      tags:
   *       - business/driver
   *      summary: Find all drivers
   *      description: Find all drivers
   *      parameters:
   *       - in: path
   *         name: businessId
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the business to find drivers
   *         example: 1
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        200:
   *          description: Successful find all drivers
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Driver'
   */

  private async findAllDrivers(
    options: ApiHandlerOptions<{
      params: BusinessGetAllDriversRequestParameters;
    }>,
  ): Promise<ApiHandlerResponse> {
    const drivers = await this.businessService.findAllDriversByBusinessId(
      options.params.businessId,
    );

    return {
      status: HttpCode.OK,
      payload: drivers,
    };
  }

  /**
   * @swagger
   * /business/{businessId}/driver/{driverId}:
   *    delete:
   *      tags:
   *       - business/driver
   *      summary: Delete driver
   *      description: Delete driver
   *      parameters:
   *       - in: path
   *         name: businessId
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the business to delete drivers
   *         example: 1
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
      params: DriverUpdateDeleteRequestParameters;
    }>,
  ): Promise<ApiHandlerResponse> {
    const deletionResult = await this.businessService.deleteDriver(
      options.params.driverId,
    );

    return {
      status: HttpCode.OK,
      payload: deletionResult,
    };
  }
}

export { BusinessController };
