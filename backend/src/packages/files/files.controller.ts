import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
} from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type FilesService } from './files.service.js';
import { fileInputDefaultsConfig } from './libs/config/config.js';
import { FilesValidationStrategy } from './libs/enums/enums.js';
import {
  type DeleteFileRequestParameters,
  type FileEntityT,
  type FileUploadResponseDto,
  type GetFileRequestParameters,
  type MultipartParsedFile,
  type UpdateFileNameRequestDto,
  type UpdateFileNameRequestParameters,
  FilesApiPath,
} from './libs/types/types.js';
import {
  filesDeleteRequestParameters,
  filesGetRequestParameters,
  filesUpdateNameRequestBody,
  filesUpdateNameRequestParameters,
} from './libs/validation-schemas/validation-schemas.js';

class FilesController extends Controller {
  private fileService: FilesService;

  public constructor(logger: ILogger, userService: FilesService) {
    super(logger, ApiPath.FILES);

    this.fileService = userService;

    this.addRoute({
      path: FilesApiPath.ROOT,
      method: 'POST',
      validateFilesStrategy: {
        strategy: FilesValidationStrategy.BASIC,
        filesInputConfig: {
          maxSize: fileInputDefaultsConfig.maxSize,
          maxFiles: fileInputDefaultsConfig.maxFiles,
          accept: fileInputDefaultsConfig.accept,
        },
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            parsedFiles: MultipartParsedFile[];
          }>,
        ),
    });

    this.addRoute({
      path: FilesApiPath.$ID,
      method: 'PUT',
      validation: {
        body: filesUpdateNameRequestBody,
        params: filesUpdateNameRequestParameters,
      },
      handler: (options) =>
        this.update(
          options as ApiHandlerOptions<{
            body: UpdateFileNameRequestDto;
            params: UpdateFileNameRequestParameters;
          }>,
        ),
    });

    this.addRoute({
      path: FilesApiPath.$ID,
      method: 'DELETE',
      validation: {
        params: filesDeleteRequestParameters,
      },
      handler: (options) =>
        this.delete(
          options as ApiHandlerOptions<{
            params: DeleteFileRequestParameters;
          }>,
        ),
    });

    this.addRoute({
      path: `${FilesApiPath.URL_ROOT}${FilesApiPath.$ID}`,
      method: 'GET',
      validation: {
        params: filesGetRequestParameters,
      },
      handler: (options) =>
        this.getUrlById(
          options as ApiHandlerOptions<{
            params: GetFileRequestParameters;
          }>,
        ),
    });

    this.addRoute({
      path: FilesApiPath.$ID,
      method: 'GET',
      validation: {
        params: filesGetRequestParameters,
      },
      handler: (options) =>
        this.getRecordById(
          options as ApiHandlerOptions<{
            params: GetFileRequestParameters;
          }>,
        ),
    });
  }

  private async create(
    options: ApiHandlerOptions<{
      parsedFiles: MultipartParsedFile[];
    }>,
  ): Promise<ApiHandlerResponse<FileUploadResponseDto>> {
    const result = await this.fileService.create(options.parsedFiles);

    return {
      status: HttpCode.OK,
      payload: {
        items: result,
        totalCount: result.length,
      },
    };
  }

  private async update(
    options: ApiHandlerOptions<{
      params: { id: FileEntityT['id'] };
      body: UpdateFileNameRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    const updatedFileRecord = await this.fileService.update(
      options.params.id,
      options.body,
    );

    return {
      status: HttpCode.OK,
      payload: {
        result: updatedFileRecord,
      },
    };
  }

  private async delete(
    options: ApiHandlerOptions<{
      params: DeleteFileRequestParameters;
    }>,
  ): Promise<ApiHandlerResponse> {
    const deletionResult = await this.fileService.delete(options.params.id);

    return {
      status: HttpCode.OK,
      payload: {
        result: deletionResult,
      },
    };
  }

  private async getUrlById(
    options: ApiHandlerOptions<{
      params: GetFileRequestParameters;
    }>,
  ): Promise<ApiHandlerResponse> {
    const url = await this.fileService.getUrlById(options.params.id);

    return {
      status: HttpCode.OK,
      payload: { result: url },
    };
  }

  private async getRecordById(
    options: ApiHandlerOptions<{
      params: GetFileRequestParameters;
    }>,
  ): Promise<ApiHandlerResponse> {
    const fileRecord = await this.fileService.findById(options.params.id);

    return {
      status: HttpCode.OK,
      payload: { result: fileRecord },
    };
  }
}

export { FilesController };
