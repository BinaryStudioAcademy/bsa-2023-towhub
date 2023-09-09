import { type ShiftCloseRequestDto } from 'shared/build/index.js';

import { type IService } from '~/libs/interfaces/service.interface';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';

import { UserGroupKey } from '../users/libs/enums/enums.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { ShiftEntity } from './shift.entity.js';
import {
  type ShiftCreateRequestDto,
  type ShiftCreateResponseDto,
  type ShiftEntity as ShiftEntityT,
} from './shift.js';
import { type ShiftRepository } from './shift.repository.js';

class ShiftService implements IService {
  private shiftRepository: ShiftRepository;

  public constructor(shiftRepository: ShiftRepository) {
    this.shiftRepository = shiftRepository;
  }

  public async findById(id: number): Promise<ShiftCreateResponseDto | null> {
    const [shift = null] = await this.shiftRepository.find({ id });

    return shift ? ShiftEntity.initialize(shift).toObject() : null;
  }

  //   public async findByOwnerId(ownerId: number): Promise<BusinessEntityT | null> {
  //     const [business = null] = await this.businessRepository.find({ ownerId });

  //     return business ? BusinessEntity.initialize(business).toObject() : null;
  //   }

  //   public async checkIsExistingBusiness(
  //     key: Pick<BusinessEntityT, 'taxNumber'>,
  //   ): Promise<boolean> {
  //     const { result: doesBusinessExist } =
  //       await this.businessRepository.checkExists(key);

  //     return doesBusinessExist;
  //   }

  public async create({
    body,
    user,
  }: {
    body: ShiftCreateRequestDto;
    user: UserEntityObjectWithGroupT;
  }): Promise<ShiftCreateResponseDto> {
    if (user.group.key !== UserGroupKey.DRIVER) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.INVALID_USER_GROUP,
      });
    }

    const shift = await this.shiftRepository.create({
      ...body,
      driverUserId: user.id,
    });

    return ShiftEntity.initialize(shift).toObject();
  }

  public async close({
    body,
    user,
    params,
  }: {
    body: ShiftCloseRequestDto;
    user: UserEntityObjectWithGroupT;
    params: Pick<ShiftEntityT, 'id'>;
  }): Promise<ShiftCreateResponseDto> {
    const shift = await this.shiftRepository.findById(params.id);

    if (!shift) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.NOT_FOUND,
      });
    }

    if (shift.driverUserId !== user.id) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.WRONG_SHIFT,
      });
    }

    if (shift.endDate !== null) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.SHIFT_ALREADY_CLOSED,
      });
    }

    const updShift = await this.shiftRepository.update({
      id: params.id,
      payload: {
        ...body,
        deletedAt: new Date(),
      },
    });

    return ShiftEntity.initialize(updShift).toObject();
  }

  //     const { result: doesBusinessExist } =
  //       await this.businessRepository.checkExists({
  //         id: owner.id,
  //         taxNumber: payload.taxNumber,
  //       });

  //     if (doesBusinessExist) {
  //       throw new HttpError({
  //         status: HttpCode.BAD_REQUEST,
  //         message: HttpMessage.BUSINESS_ALREADY_EXISTS,
  //       });
  //     }

  //     const business = await this.businessRepository.create(
  //       BusinessEntity.initializeNew({ ...payload, ownerId: owner.id }),
  //     );

  //     return business.toObject();
  //   }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<ShiftEntityT>;
  }): Promise<ShiftCreateResponseDto> {
    const result = await this.shiftRepository.update({ id, payload });

    return ShiftEntity.initialize(result).toObject();
  }

  public async delete(id: number): Promise<boolean> {
    return await this.shiftRepository.delete(id);
  }

  //   public async createDriver({
  //     payload,
  //     businessId,
  //   }: DriverAddPayload): Promise<DriverAddResponseWithGroup> {
  //     const doesBusinessExist = await this.findById(businessId);

  //     if (!doesBusinessExist) {
  //       throw new HttpError({
  //         status: HttpCode.BAD_REQUEST,
  //         message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
  //       });
  //     }

  //     return await this.driverService.create({ payload, businessId });
  //   }

  //   public updateDriver({
  //     driverId,
  //     payload,
  //   }: DriverUpdatePayload): Promise<DriverCreateUpdateResponseDto> {
  //     return this.driverService.update({
  //       driverId,
  //       payload,
  //     });
  //   }

  //   public findAllDriversByBusinessId(
  //     id: number,
  //   ): Promise<DriverGetAllResponseDto> {
  //     return this.driverService.findAllByBusinessId(id);
  //   }

  //   public deleteDriver(driverId: number): Promise<boolean> {
  //     return this.driverService.delete(driverId);
  //   }
}

export { ShiftService };
