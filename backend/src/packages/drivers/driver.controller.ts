import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  type UserMocked,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type DriverService } from './driver.service.js';
import { DriverApiPath } from './libs/enums/enums.js';
import {
  type DriverAddRequestDto,
  type DriverDeleteRequestParameters,
  type DriverGetRequestParameters,
  type DriverUpdateRequestDto,
  type DriverUpdateRequestParameters,
} from './libs/types/types.js';
// import {
//   driverAddRequestBody,
//   driverDeleteParameters,
//   driverGetParameters,
//   driverUpdateParameters,
//   driverUpdateRequestBody,
// } from './libs/validation-schemas/validation-schemas.js';

/**
 * @swagger
 * tags:
 *   name: driver
 *   description: Driver API
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
 *      DriverAlreadyExists:
 *        allOf:
 *          - $ref: '#/components/schemas/ErrorType'
 *          - type: object
 *            properties:
 *              message:
 *                type: string
 *                enum:
 *                 - Driver already exists
 *      DriverLicenseNumberAlreadyRegistered:
 *        allOf:
 *          - $ref: '#/components/schemas/ErrorType'
 *          - type: object
 *            properties:
 *              message:
 *                type: string
 *                enum:
 *                 - Driver with such license number already exists
 *      InvalidUserGroup:
 *        allOf:
 *          - $ref: '#/components/schemas/ErrorType'
 *          - type: object
 *            properties:
 *              message:
 *                type: string
 *                enum:
 *                 - User of the group cannot create this!
 *      DriverDoesNotExist:
 *        allOf:
 *          - $ref: '#/components/schemas/ErrorType'
 *          - type: object
 *            properties:
 *              message:
 *                type: string
 *                enum:
 *                 - Driver does not exist!
 *
 *      DriverDeletionResult:
 *        type: object
 *        required:
 *          - result
 *        properties:
 *          result:
 *            type: boolean
 *            example: true
 *            description: true, if deletion successful
 *
 *      DriverFindResult:
 *        type: object
 *        properties:
 *          result:
 *            oneOf:
 *              - $ref: '#/components/schemas/Driver'
 *            nullable: true
 *
 *      Driver:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          driverLicenseNumber:
 *            type: string
 *            minLength: 10
 *            example: AAA 123456
 *          userId:
 *            type: number
 *            format: number
 *            minimum: 1
 *            description: User id to which the driver belongs
 *            example: 1
 *          businessId:
 *            type: number
 *            format: number
 *            minimum: 1
 *            description: Business id to which the driver belongs
 *            example: 1
 * security:
 *   - bearerAuth: []
 */
class DriverController extends Controller {
  private driverService: DriverService;

  public constructor(logger: ILogger, driverService: DriverService) {
    super(logger, ApiPath.BUSINESS);

    this.driverService = driverService;

    this.addRoute({
      path: DriverApiPath.ROOT,
      method: 'POST',
      //   validation: {
      //     body: driverAddRequestBody,
      //   },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            body: DriverAddRequestDto;
            user: UserMocked;
          }>,
        ),
    });

    this.addRoute({
      path: DriverApiPath.$ID,
      method: 'PUT',
      //   validation: {
      //     body: driverUpdateRequestBody,
      //     params: driverUpdateParameters,
      //   },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: DriverUpdateRequestDto;
            params: DriverUpdateRequestParameters;
            user: UserMocked;
          }>,
        ),
    });

    this.addRoute({
      path: DriverApiPath.$ID,
      method: 'DELETE',
      //   validation: {
      //     params: driverDeleteParameters,
      //   },
      handler: (options) =>
        this.delete(
          options as ApiHandlerOptions<{
            params: DriverDeleteRequestParameters;
            user: UserMocked;
          }>,
        ),
    });

    this.addRoute({
      path: DriverApiPath.$ID,
      method: 'GET',
      //   validation: {
      //     params: driverGetParameters,
      //   },
      handler: (options) =>
        this.find(
          options as ApiHandlerOptions<{
            params: DriverGetRequestParameters;
            user: UserMocked;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /driver/:
   *    post:
   *      tags:
   *       - driver
   *      summary: Create driver
   *      description: Create driver
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *               - driverLicenseNumber
   *               - userId
   *              properties:
   *                driverLicenseNumber:
   *                  $ref: '#/components/schemas/Driver/properties/driverLicenseNumber'
   *              properties:
   *                userId:
   *                  $ref: '#/components/schemas/Driver/properties/userId'
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
  private async create(
    options: ApiHandlerOptions<{
      body: DriverAddRequestDto;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const createdDriver = await this.driverService.create({
      payload: options.body,
      owner: options.user,
    });

    return {
      status: HttpCode.CREATED,
      payload: createdDriver,
    };
  }

  /**
   * @swagger
   * /driver/{id}:
   *    put:
   *      tags:
   *       - driver
   *      summary: Update driver
   *      description: Update driver
   *      parameters:
   *       - in: path
   *         name: id
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
   *              required:
   *               - driverLicenseNumber
   *              properties:
   *                driverLicenseNumber:
   *                  $ref: '#/components/schemas/Driver/properties/driverLicenseNumber'
   *      responses:
   *        200:
   *          description: Successful driver update.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Driver'
   *        400:
   *          description:
   *            Driver with such ID does not exist or driver license number is already exists
   *          content:
   *            plain/text:
   *              schema:
   *                $ref: '#/components/schemas/DriverDoesNotExist'
   */
  private async update(
    options: ApiHandlerOptions<{
      body: DriverUpdateRequestDto;
      params: DriverUpdateRequestParameters;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const updatedDriver = await this.driverService.update({
      id: options.params.id,
      payload: options.body,
      owner: options.user,
    });

    return {
      status: HttpCode.OK,
      payload: updatedDriver,
    };
  }

  /**
   * @swagger
   * /driver/{id}:
   *    delete:
   *      tags:
   *       - driver
   *      summary: Delete driver
   *      description: Delete driver
   *      parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the driver to delete
   *         example: 1
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
  private async delete(
    options: ApiHandlerOptions<{
      params: DriverDeleteRequestParameters;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const deletionResult = await this.driverService.delete(options.params.id);

    return {
      status: HttpCode.OK,
      payload: deletionResult,
    };
  }

  /**
   * @swagger
   * /driver/{id}:
   *    get:
   *      tags:
   *       - driver
   *      summary: Find driver
   *      description: Find driver
   *      parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric ID of the driver to get
   *         example: 1
   *      responses:
   *        200:
   *          description: Find operation had no errors.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/driverFindResult'
   */
  private async find(
    options: ApiHandlerOptions<{
      params: DriverGetRequestParameters;
      user: UserMocked;
    }>,
  ): Promise<ApiHandlerResponse> {
    const findDriverById = await this.driverService.find(options.params.id);

    return {
      status: HttpCode.OK,
      payload: findDriverById,
    };
  }
}

export { DriverController };
