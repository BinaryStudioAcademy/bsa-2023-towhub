import { PRECISION } from './libs/constants/constants.js';
import { TravelMode } from './libs/enums/enums.js';
import { convertMetersToKm } from './libs/helpers/helpers.js';
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
    startPoint: string | google.maps.LatLngLiteral,
    endPoint: string | google.maps.LatLngLiteral,
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
    pricePerKm,
  }: OrderCalculatePriceRequestDto): Promise<OrderCalculatePriceResponseDto> {
    const distance = await this.getDistance(startAddress, endAddress);

    const km = convertMetersToKm(distance.value);
    const orderPrice = (pricePerKm * km).toFixed(PRECISION);

    return { price: Number(orderPrice) };
  }
}

export { MapService };
