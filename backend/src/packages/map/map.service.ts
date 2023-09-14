import { TravelMode } from './libs/enums/enums.js';
import { convertMetersToKm } from './libs/helpers/helpers.js';
import {
  type CalculatePriceResponse,
  type Client,
  type Distance,
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
    const [resultArray] = response.data.rows;
    const [resultElement] = resultArray.elements;

    return resultElement.distance;
  }

  public async getPriceByDistance({
    startPoint,
    endPoint,
    pricePerKm,
  }: {
    startPoint: string;
    endPoint: string;
    pricePerKm: number;
  }): Promise<CalculatePriceResponse> {
    const distance = await this.getDistance(startPoint, endPoint);
    const km = convertMetersToKm(distance.value);
    const orderPrice = (pricePerKm * km).toFixed(2);

    return { price: Number(orderPrice) };
  }
}

export { MapService };
