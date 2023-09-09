import { type ShiftCloseRequestDto } from 'shared/build/index.js';

import { type IService } from '~/libs/interfaces/service.interface';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';

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

  public async getAllStarted(): Promise<ShiftCreateResponseDto[]> {
    const shifts = await this.shiftRepository.getAllOpened();

    return shifts.length > 0
      ? shifts.map((it) => ShiftEntity.initialize(it).toObject())
      : [];
  }

  public async findById(id: number): Promise<ShiftCreateResponseDto | null> {
    const [shift = null] = await this.shiftRepository.find({ id });

    return shift ? ShiftEntity.initialize(shift).toObject() : null;
  }

  public async findByShiftId(
    shiftId: number,
    userId: number,
  ): Promise<ShiftCreateResponseDto> {
    const [shift = null] = await this.shiftRepository.find({ id: shiftId });

    if (!shift) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: HttpMessage.NOT_FOUND,
      });
    }

    if (shift.driverUserId !== userId) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.WRONG_SHIFT,
      });
    }

    return ShiftEntity.initialize(shift).toObject();
  }

  public async findByDriverUserId(
    driverUserId: number,
  ): Promise<ShiftCreateResponseDto[]> {
    const shifts = await this.shiftRepository.find({
      driverUserId,
    });

    return shifts.length > 0
      ? shifts.map((it) => ShiftEntity.initialize(it).toObject())
      : [];
  }

  public async create({
    body,
    user,
  }: {
    body: ShiftCreateRequestDto;
    user: UserEntityObjectWithGroupT;
  }): Promise<ShiftCreateResponseDto> {
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
    const shift = await this.findByShiftId(params.id, user.id);

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
}

export { ShiftService };
