import { type IService } from '~/libs/interfaces/service.interface';
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

    public async find(id:number):Promise<BusinessFindResponseDto|null>{
        const business = await this.businessRepository.find(id);

        return business ? business.toObject() : null;
    }

    public async findByOwnerId(ownerId:number):Promise<BusinessFindResponseDto|null>{
        const business = await this.businessRepository.findByOwnerId(ownerId);

        return business ? business.toObject() : null;
    }

    public async create(payload: Omit<BusinessEntityT,'id'>):Promise<BusinessAddResponseDto>{
        const business = await this.businessRepository.create(
            BusinessEntity.initializeNew({ ...payload }),
        );

        return business.toObject();
    }

    public async update({ id,payload }:{ id:number,payload:Partial<BusinessEntityT> }):Promise<BusinessUpdateResponseDto>{
        const business = await this.businessRepository.update({ id,payload });

        return business.toObject();
    }

    public async delete(id:number):Promise<BusinessDeleteResponseDto>{
        const result = await this.businessRepository.delete(id);

        return {
            result
        };
    }
}

export { BusinessService };