import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
} from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { TruckApiPath } from './libs/enums/enums.js';
import { type TruckEntityT } from './libs/types/types.js';
import {
  truckIdParameterValidationSchema,
  truckRequestBodyValidationSchema,
} from './libs/validation-schema/validation-schemas.js';
import { type TruckService } from './truck.service.js';

/**
 * @swagger
 * tags:
 *   name: truck
 *   description: Trucks API
 * components:
 *   schemas:
 *
 *     Truck:
 *       type: object
 *       properties:
 *         manufacturer:
 *           type: string
 *           enum:
 *             - miller_industries
 *             - mercedes_benz
 *             - daf
 *             - man
 *             - volvo
 *             - renault
 *             - iveco
 *             - scania
 *             - kenworth
 *             - ford
 *         towType:
 *           type: string
 *           enum:
 *             - flatbed_or_rollback
 *             - hook_and_chain
 *             - integrated
 *             - wheel_lift
 *         year:
 *           type: string
 *         licensePlateNumber:
 *           type: string
 *         capacity:
 *           type: number
 *         pricePerKm:
 *           type: number
 *
 *     TruckResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         manufacturer:
 *           type: string
 *           enum:
 *             - miller_industries
 *             - mercedes_benz
 *             - daf
 *             - man
 *             - volvo
 *             - renault
 *             - iveco
 *             - scania
 *             - kenworth
 *             - ford
 *         towType:
 *           type: string
 *           enum:
 *             - flatbed_or_rollback
 *             - hook_and_chain
 *             - integrated
 *             - wheel_lift
 *         year:
 *           type: string
 *         licensePlateNumber:
 *           type: string
 *         capacity:
 *           type: number
 *         pricePerKm:
 *           type: number
 *
 *     ErrorType:
 *       type: object
 *       properties:
 *         errorType:
 *           type: string
 *           example: COMMON
 *           enum:
 *             - COMMON
 *             - VALIDATION
 *
 *     TruckAlreadyExists:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - Truck already exists!
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */
class TruckController extends Controller {
  private truckService: TruckService;

  public constructor(logger: ILogger, truckService: TruckService) {
    super(logger, ApiPath.TRUCKS);

    this.truckService = truckService;

    this.addRoute({
      path: TruckApiPath.ROOT,
      method: 'POST',
      validation: {
        body: truckRequestBodyValidationSchema,
      },
      handler: (request) =>
        this.create(
          request as ApiHandlerOptions<{
            body: TruckEntityT;
          }>,
        ),
    });

    this.addRoute({
      path: TruckApiPath.$ID,
      method: 'PUT',
      validation: {
        body: truckRequestBodyValidationSchema,
        params: truckIdParameterValidationSchema,
      },
      handler: (request) =>
        this.update(
          request as ApiHandlerOptions<{
            body: Partial<TruckEntityT>;
            params: { id: number };
          }>,
        ),
    });

    this.addRoute({
      path: TruckApiPath.ROOT,
      method: 'GET',
      handler: () => this.getAll(),
    });

    this.addRoute({
      path: TruckApiPath.$ID,
      method: 'GET',
      validation: {
        params: truckIdParameterValidationSchema,
      },
      handler: (request) =>
        this.get(
          request as ApiHandlerOptions<{
            params: { id: number };
          }>,
        ),
    });

    this.addRoute({
      path: TruckApiPath.$ID,
      method: 'DELETE',
      validation: {
        params: truckIdParameterValidationSchema,
      },
      handler: (request) =>
        this.delete(
          request as ApiHandlerOptions<{
            params: { id: number };
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /trucks/:
   *   post:
   *     summary: Create a new truck
   *     tags:
   *       - truck
   *     requestBody:
   *       description: Truck data to be added
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Truck'
   *     responses:
   *       '201':
   *         description: Truck created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TruckResponse'
   *       '400':
   *         description: Bad request
   *
   */
  private async create(
    options: ApiHandlerOptions<{
      body: TruckEntityT;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.truckService.create(options.body),
    };
  }

  /**
   * @swagger
   * /trucks/{id}:
   *   put:
   *     summary: Update a truck by ID
   *     tags:
   *       - truck
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of the truck to update
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       description: Updated truck data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Truck'
   *     responses:
   *       '200':
   *         description: Truck updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TruckResponse'
   *       '400':
   *         description: Bad request
   *       '404':
   *         description: Truck not found
   *
   */

  private async update(
    options: ApiHandlerOptions<{
      body: Partial<TruckEntityT>;
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    const { params, body } = options;

    const updatedTruck = await this.truckService.update(params.id, body);

    return {
      status: HttpCode.OK,
      payload: updatedTruck,
    };
  }

  /**
   * @swagger
   * /trucks:
   *   get:
   *     summary: Get all trucks
   *     tags:
   *       - truck
   *     responses:
   *       '200':
   *         description: List of trucks
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/TruckResponse'
   *       '500':
   *         description: Internal server error
   */
  private async getAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.truckService.getAll(),
    };
  }

  /**
   * @swagger
   * /trucks/{id}:
   *   get:
   *     summary: Get a truck by ID
   *     tags:
   *       - truck
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of the truck to retrieve
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: Truck retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TruckResponse'
   *       '404':
   *         description: Truck not found
   *       '500':
   *         description: Internal server error
   */
  private async get(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.truckService.findById(options.params.id),
    };
  }

  /**
   * @swagger
   * /trucks/{id}:
   *   delete:
   *     summary: Delete a truck by ID
   *     tags:
   *       - truck
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of the truck to delete
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '204':
   *         description: Truck deleted successfully
   *       '404':
   *         description: Truck not found
   *       '500':
   *         description: Internal server error
   */
  private async delete(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.truckService.delete(options.params.id),
    };
  }
}

export { TruckController };
