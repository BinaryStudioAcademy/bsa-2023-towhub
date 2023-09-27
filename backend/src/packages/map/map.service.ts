import { PRECISION } from './libs/constants/constants.js';
import { TravelMode } from './libs/enums/enums.js';
import { convertMetersToKilometers } from './libs/helpers/helpers.js';
import {
  type Client,
  type Distance,
  type OrderCalculatePriceRequestDto,
  type OrderCalculatePriceResponseDto,
} from './libs/types/types.js';

class MapService {
  private client: Client;

  private key: string;

  public constructor(client: Client, key: string) {
    this.client = client;
    this.key = key;
  }

  public async getDistance(
    startPoint: string,
    endPoint: string,
  ): Promise<Distance> {
    const response = await this.client.distancematrix({
      params: {
        key: this.key,
        origins: [startPoint],
        destinations: [endPoint],
        mode: TravelMode.driving,
      },
    });
    const [firstRow] = response.data.rows;
    const [firstElement] = firstRow.elements;

    return firstElement.distance;
  }

  public async getPriceByDistance({
    startAddress,
    endAddress,
    pricePerKm, // TODO kilometer
  }: OrderCalculatePriceRequestDto): Promise<OrderCalculatePriceResponseDto> {
    const distance = await this.getDistance(startAddress, endAddress);
    const kilometers = convertMetersToKilometers(distance.value);
    const orderPrice = (pricePerKm * kilometers).toFixed(PRECISION);

    return { price: Number(orderPrice) };
  }
}

export { MapService };
