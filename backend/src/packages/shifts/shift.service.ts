import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';

import { type BusinessService } from '../business/business.service.js';
import { type DriverService } from '../drivers/driver.service.js';
import { UserGroupKey } from '../groups/groups.js';
import { type UserEntityObjectWithGroupT } from '../users/users.js';
import { ShiftEntity } from './shift.entity.js';
import {
  type ShiftCloseRequestDto,
  type ShiftCreateRequestDto,
  type ShiftEntity as ShiftEntityT,
  type ShiftResponseDto,
} from './shift.js';
import { type ShiftRepository } from './shift.repository.js';

class ShiftService implements IService {
  private shiftRepository: ShiftRepository;

  private businessService: BusinessService;

  private driverService: DriverService;

  public constructor(
    shiftRepository: ShiftRepository,
    businessService: BusinessService,
    driverService: DriverService,
  ) {
    this.shiftRepository = shiftRepository;
    this.businessService = businessService;
    this.driverService = driverService;
  }

  public async getAllStarted(): Promise<ShiftResponseDto[]> {
    const shifts = await this.shiftRepository.getAllOpened();

    return shifts.map((it) => ShiftEntity.initialize(it).toObject());
  }

  public async findById(id: number): Promise<ShiftResponseDto | null> {
    const [shift = null] = await this.shiftRepository.find({ id });

    return shift ? ShiftEntity.initialize(shift).toObject() : null;
  }

  public async findByShiftId(shiftId: number): Promise<ShiftResponseDto> {
    const [shift = null] = await this.shiftRepository.find({ id: shiftId });

    if (!shift) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.NOT_FOUND,
      });
    }

    return ShiftEntity.initialize(shift).toObject();
  }

  public async findByDriverUserId(
    driverId: number,
  ): Promise<ShiftResponseDto[]> {
    const shifts = await this.shiftRepository.find({
      driverId,
    });

    return shifts.map((it) => ShiftEntity.initialize(it).toObject());
  }

  public async findOpenedByDriver(
    driverId: number,
  ): Promise<ShiftResponseDto | null> {
    const shift = await this.shiftRepository.getOpenedByDriver(driverId);

    return shift ? ShiftEntity.initialize(shift).toObject() : null;
  }

  public async findOpenedByTruckWithBusiness(
    truckId: number,
  ): Promise<
    (ShiftEntityT & { businessId: number; driverLicenseNumber: string }) | null
  > {
    const shiftDatabase =
      await this.shiftRepository.getOpenedByTruckWithBusiness(truckId);

    if (!shiftDatabase) {
      return null;
    }
    const shift = ShiftEntity.initialize(shiftDatabase).toObject();

    return {
      ...shift,
      businessId: shiftDatabase.businessId,
      driverLicenseNumber: shiftDatabase.driverLicenseNumber,
    };
  }

  public async create({
    body,
    user,
  }: {
    body: ShiftCreateRequestDto;
    user: UserEntityObjectWithGroupT;
  }): Promise<ShiftResponseDto> {
    const canCreateShift = await this.checkHasAccessToShift({
      driverId: body.driverId,
      user,
    });

    if (!canCreateShift) {
      throw new HttpError({
        status: HttpCode.FORBIDDEN,
        message: HttpMessage.NOT_ACCESS,
      });
    }

    const shift = await this.shiftRepository.create(body);

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
  }): Promise<ShiftResponseDto> {
    const shift = await this.findByShiftId(params.id);

    const canCloseShift = await this.checkHasAccessToShift({
      driverId: shift.driverId,
      user,
    });

    if (!canCloseShift) {
      throw new HttpError({
        status: HttpCode.FORBIDDEN,
        message: HttpMessage.NOT_ACCESS,
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
      payload: body,
    });

    await this.delete(updShift.id);

    return ShiftEntity.initialize(updShift).toObject();
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<ShiftEntityT>;
  }): Promise<ShiftResponseDto> {
    const result = await this.shiftRepository.update({ id, payload });

    return ShiftEntity.initialize(result).toObject();
  }

  public async delete(id: number): Promise<boolean> {
    const shift = await this.shiftRepository.update({
      id,
      payload: { deletedAt: new Date() },
    });

    return Boolean(shift);
  }

  private async checkHasAccessToShift({
    user,
    driverId,
  }: {
    user: UserEntityObjectWithGroupT;
    driverId: ShiftEntityT['driverId'];
  }): Promise<boolean> {
    const { id: userId, group } = user;

    if (group.key === UserGroupKey.BUSINESS) {
      return await this.businessService.checkisDriverBelongedToBusiness({
        userId,
        driverId,
      });
    }

    if (group.key === UserGroupKey.DRIVER) {
      return userId === driverId;
    }

    return false;
  }
}

export { ShiftService };
