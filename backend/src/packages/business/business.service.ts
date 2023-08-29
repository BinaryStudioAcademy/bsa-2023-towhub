import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';
import { type OperationResult } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

import { BusinessEntity } from './business.entity.js';
import { type BusinessRepository } from './business.repository.js';
import {
  type BusinessAddResponseDto,
  type BusinessCreatePayload,
  type BusinessEntityT,
  type BusinessUpdateResponseDto,
} from './libs/types/types.js';

class BusinessService implements IService {
  private businessRepository: BusinessRepository;

  public constructor(businessRepository: BusinessRepository) {
    this.businessRepository = businessRepository;
  }

  public async find(
    id: number,
  ): Promise<OperationResult<BusinessEntityT | null>> {
    const business = await this.businessRepository.find(id);

    return { result: business ? business.toObject() : null };
  }

  public async create({
    payload,
    owner,
  }: BusinessCreatePayload): Promise<BusinessAddResponseDto> {
    if (owner.group.key !== UserGroupKey.BUSINESS) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.INVALID_USER_GROUP,
      });
    }

    const { result: doesBusinessExist } =
      await this.businessRepository.checkExists({
        id: owner.id,
        taxNumber: payload.taxNumber,
        companyName: payload.companyName,
      });

    if (doesBusinessExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_ALREADY_EXISTS,
      });
    }

    const business = await this.businessRepository.create(
      BusinessEntity.initializeNew({ ...payload, ownerId: owner.id }),
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
    const { result: foundBusinessById } = await this.find(id);

    if (!foundBusinessById) {
      throw new NotFoundError({});
    }

    const { result: doesBusinessExist } =
      await this.businessRepository.checkExists({
        companyName: payload.companyName,
      });

    if (doesBusinessExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.NAME_ALREADY_REGISTERED,
      });
    }

    const business = await this.businessRepository.update({
      id: foundBusinessById.id,
      payload,
    });

    return business.toObject();
  }

  public async delete(id: number): Promise<OperationResult<boolean>> {
    const { result: foundBusiness } = await this.find(id);

    if (!foundBusiness) {
      throw new NotFoundError({});
    }

    const result = await this.businessRepository.delete(id);

    return {
      result,
    };
  }
}

export { BusinessService };
