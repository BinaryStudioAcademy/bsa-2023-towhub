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

  public async find(id: number): Promise<BusinessFindResponseDto | null> {
    const business = await this.businessRepository.find(id);

    return business ? business.toObject() : null;
  }

  public async findByOwnerId(
    ownerId: number,
  ): Promise<BusinessFindResponseDto | null> {
    const business = await this.businessRepository.findByOwnerId(ownerId);

    return business ? business.toObject() : null;
  }

  public async findByTaxNumber(
    taxNumber: string,
  ): Promise<BusinessFindResponseDto | null> {
    const business = await this.businessRepository.findByTaxNumber(taxNumber);

    return business ? business.toObject() : null;
  }

  public async findByName(
    companyName: string,
  ): Promise<BusinessFindResponseDto | null> {
    const business = await this.businessRepository.findByName(companyName);

    return business ? business.toObject() : null;
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

    const existingBusiness = await this.findByOwnerId(owner.id);

    if (existingBusiness) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.BUSINESS_ALREADY_EXISTS,
      });
    }

    const businessWithSameTaxNumber = await this.findByTaxNumber(
      payload.taxNumber,
    );

    if (businessWithSameTaxNumber) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.TAX_NUMBER_ALREADY_REGISTERED,
      });
    }

    const businessWithSameName = await this.findByName(payload.companyName);

    if (businessWithSameName) {
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
    const businessToUpdate = await this.find(id);

    if (!businessToUpdate) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const businessWithSameName = await this.findByName(payload.companyName);

    if (businessWithSameName) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.NAME_ALREADY_REGISTERED,
      });
    }

    const business = await this.businessRepository.update({
      id: businessToUpdate.id,
      payload,
    });

    return business.toObject();
  }

  public async delete(id: number): Promise<BusinessDeleteResponseDto> {
    const businessToDelete = await this.find(id);

    if (!businessToDelete) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpErrorMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const result = await this.businessRepository.delete(businessToDelete.id);

    return {
      result,
    };
  }
}

export { BusinessService };
