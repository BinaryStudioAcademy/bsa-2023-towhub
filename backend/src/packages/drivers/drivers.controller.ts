import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
} from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { AuthStrategy } from '../auth/libs/enums/auth-strategy.enum.js';
import { FilesValidationStrategy } from '../files/files.js';
import { avatarInputDefaultsConfig } from '../files/libs/config/config.js';
import { type MultipartParsedFile } from '../files/libs/types/types.js';
import { type DriverService } from './driver.service.js';
import { DriverApiPath } from './libs/enums/enums.js';
import { type DriverWithUserData } from './libs/types/types.js';

/**
 * @swagger
 * tags:
 *   name: drivers
 *   description: Drivers API
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
 *     FileAlreadyExists:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - File *name* already exists!
 *     FileDoesNotExist:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                 - File with such id does not exist!
 *     DriverNotFoundError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorType'
 *         - type: object
 *           properties:
 *             message:
 *               type: string
 *               enum:
 *                - Driver does not exist!
 *     DriverWithUserData:
 *       type: object
 *       properties:
 *         groupId:
 *           type: number
 *         id:
 *           type: number
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         driver:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             driverLicenseNumber:
 *               type: string
 *             userId:
 *               type: number
 *             businessId:
 *               type: number
 *             createdAt:
 *               type: string
 *             avatarId:
 *               type: number
 *             avatarUrl:
 *               type: string
 *
 * security:
 *   - bearerAuth: []
 */
class DriversController extends Controller {
  private driverService: DriverService;

  public constructor(logger: ILogger, driverService: DriverService) {
    super(logger, ApiPath.DRIVERS);

    this.driverService = driverService;

    this.addRoute({
      path: DriverApiPath.AVATAR,
      method: 'POST',
      validateFilesStrategy: {
        strategy: FilesValidationStrategy.BASIC,
        filesInputConfig: {
          maxSizeBytes: avatarInputDefaultsConfig.maxSizeBytes,
          maxFiles: avatarInputDefaultsConfig.maxFiles,
          accept: avatarInputDefaultsConfig.accept,
        },
      },
      authStrategy: [AuthStrategy.VERIFY_JWT, AuthStrategy.VERIFY_DRIVER_GROUP],
      handler: (options) =>
        this.setAvatar(
          options as ApiHandlerOptions<{
            parsedFiles: MultipartParsedFile[];
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /drivers/avatar:
   *    post:
   *      tags:
   *       - files
   *      summary: Upload a single avatar file
   *      description: Upload avatar
   *      requestBody:
   *        content:
   *          multipart/form-data:
   *            schema:
   *              type: object
   *              properties:
   *                files:
   *                  type: array
   *                  items:
   *                    type: string
   *                    format: binary
   *      responses:
   *        201:
   *          description: Successful file upload.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  result:
   *                    $ref: '#/components/schemas/DriverWithUserData'
   *        400:
   *          description: Driver not found.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/DriverNotFoundError'
   */
  private async setAvatar(
    options: ApiHandlerOptions<{
      parsedFiles: MultipartParsedFile[];
    }>,
  ): Promise<ApiHandlerResponse<DriverWithUserData>> {
    const [parsedFile] = options.parsedFiles;
    const newAvatar = await this.driverService.setAvatar(
      options.user.id,
      parsedFile,
    );

    return {
      status: HttpCode.OK,
      payload: newAvatar,
    };
  }
}

export { DriversController };
