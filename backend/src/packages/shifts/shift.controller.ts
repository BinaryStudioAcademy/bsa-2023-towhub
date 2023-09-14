import { ApiPath, HttpCode } from '~/libs/enums/enums.js';
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
      path: ShiftsApiPath.DRIVER_$ID,
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

/**
 * @swagger
 * components:
 *    schemas:
 *      Shift:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            min: 1
 *          startDate:
 *            type: string
 *            format: date-time
 *            description: date-time format "YYYY-MM-DDThh:mm:ssZ"
 *            example: 2023-07-21T17:32:28Z
 *          endDate:
 *            type: string
 *            nullable: true
 *            format: date-time
 *            description: date-time format "YYYY-MM-DDThh:mm:ssZ" | null
 *            example: 2023-07-21T17:32:28Z
 *          driverId:
 *            type: number
 *            min: 1
 *            example: 45
 *            description: a valid user id of driver
 *          truckId:
 *            type: number
 *            min: 1
 *            example: 121
 *            description: a valid truck id
 *
 *      ShiftErrorNotAccess:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - You do not have enough rights to operate this shift
 *
 *      ShiftErrorAlreadyCLosed:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Specified shift is already closed
 *
 *      ErrorNotFound:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Not found
 */

/**
 * @swagger
 * /shifts/:
 *    get:
 *      tags:
 *      - shifts
 *      summary: Get all opened driver's shifts
 *      responses:
 *        200:
 *          description: List of opened driver's shift
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Shift'
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *      - shifts
 *      summary: Create (open) driver's shift
 *      description: A shift can be opened whether by a business user for the driver belonged to his business or by driver for himself only
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - startDate
 *                - driverId
 *                - truckId
 *              properties:
 *                startDate:
 *                  $ref: '#/components/schemas/Shift/properties/startDate'
 *                driverId:
 *                  $ref: '#/components/schemas/Shift/properties/driverId'
 *                truckId:
 *                  $ref: '#/components/schemas/Shift/properties/truckId'
 *      responses:
 *        201:
 *          description: Created driver's shift
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Shift'
 *        403:
 *          description: Created driver's shift
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ShiftErrorNotAccess'
 */

/**
 * @swagger
 * /shifts/{id}:
 *    put:
 *      security:
 *      - bearerAuth: []
 *      tags:
 *      - shifts
 *      summary: Close driver's shifts
 *      description: A shift can be closed whether by a business user for the driver belonged to his business or by driver for himself only
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: A valid id of the shift to close
 *          example: 1
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - endDate
 *              properties:
 *                endDate:
 *                  $ref: '#/components/schemas/Shift/properties/endDate'
 *      responses:
 *        200:
 *          description: Closed driver's shift
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Shift'
 *        400:
 *          description: Specified shift is already closed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ShiftErrorAlreadyCLosed'
 *        403:
 *          description: The user doesn't have enough rights for closing this shift
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ShiftErrorNotAccess'
 *    get:
 *      tags:
 *      - shifts
 *      summary: Get driver's shift by id
 *      description: Get a particular driver's shift by id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: A valid id of the shift to close
 *          example: 1
 *      responses:
 *        200:
 *          description: Driver's shift
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Shift'
 *        404:
 *          description: The driver's shift with specified id was not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorNotFound'
 */

/**
 * @swagger
 * /shifts/drive/{id}:
 *    get:
 *      tags:
 *      - shifts
 *      summary: Get shifts of the driver
 *      description: Get a list of shifts of specified driver
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: A valid  user id of the driver
 *          example: 1
 *      responses:
 *        200:
 *          description: Driver's shift
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Shift'
 */
