import { type IService } from '~/libs/interfaces/service.interface.js';
import { GroupKeysMocked } from '~/libs/packages/controller/controller.package.js';
import { type UserMocked } from '~/libs/packages/controller/libs/types/api-handler-options.type.js';
import {
  HttpCode,
  HttpError,
  HttpErrorMessage,
} from '~/libs/packages/http/http.js';
import { type BusinessRepository } from '~/packages/business/business.repository.js';

import { BusinessEntity } from './business.entity.js';
import {
  type BusinessAddResponseDto,
  type BusinessDeleteResponseDto,
  type BusinessEntity as BusinessEntityT,
  type BusinessFindResponseDto,
  type BusinessUpdateResponseDto,
} from './libs/types/types.js';

class BusinessService implements IService {
  private businessRepository: BusinessRepository;

  public constructor(businessRepository: BusinessRepository) {
    this.businessRepository = businessRepository;
  }

  public async find(id: number): Promise<BusinessFindResponseDto> {
    const business = await this.businessRepository.find(id);

    return { result: business ? business.toObject() : null };
  }

  public async findByOwnerId(
    ownerId: number,
  ): Promise<BusinessFindResponseDto> {
    const business = await this.businessRepository.findByOwnerId(ownerId);

    return { result: business ? business.toObject() : null };
  }

  public async findByTaxNumber(
    taxNumber: string,
  ): Promise<BusinessFindResponseDto> {
    const business = await this.businessRepository.findByTaxNumber(taxNumber);

    return { result: business ? business.toObject() : null };
  }

  public async findByCompanyName(
    companyName: string,
  ): Promise<BusinessFindResponseDto> {
    const business = await this.businessRepository.findByName(companyName);

    return { result: business ? business.toObject() : null };
  }

  public async create({
    payload,
    owner,
  }: {
    payload: Omit<BusinessEntityT, 'id'>;
    owner: UserMocked;
  }): Promise<BusinessAddResponseDto> {
    if (owner.group.key !== GroupKeysMocked.BUSINESS) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.INVALID_USER_GROUP,
      });
    }

    const searchByOwnerId = await this.findByOwnerId(owner.id);

    if (searchByOwnerId.result) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.BUSINESS_ALREADY_EXISTS,
      });
    }

    const searchByTaxNumber = await this.findByTaxNumber(payload.taxNumber);

    if (searchByTaxNumber.result) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.TAX_NUMBER_ALREADY_REGISTERED,
      });
    }

    const searchByCompanyName = await this.findByCompanyName(
      payload.companyName,
    );

    if (searchByCompanyName.result) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.NAME_ALREADY_REGISTERED,
      });
    }

    const business = await this.businessRepository.create(
      BusinessEntity.initializeNew({ ...payload }),
    );

    return business.toObject();
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Pick<BusinessEntityT, 'companyName'>;
  }): Promise<BusinessUpdateResponseDto> {
    const searchById = await this.find(id);

    if (!searchById.result) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const searchByCompanyName = await this.findByCompanyName(
      payload.companyName,
    );

    if (searchByCompanyName.result) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.NAME_ALREADY_REGISTERED,
      });
    }

    const business = await this.businessRepository.update({
      id: searchById.result.id,
      payload,
    });

    return business.toObject();
  }

  public async delete(id: number): Promise<BusinessDeleteResponseDto> {
    const searchById = await this.find(id);

    if (!searchById.result) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const result = await this.businessRepository.delete(searchById.result.id);

    return {
      result,
    };
  }
}

export { BusinessService };
