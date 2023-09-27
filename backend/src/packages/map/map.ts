import { Client } from '@googlemaps/google-maps-services-js';

import { config } from '~/libs/packages/config/config.js';

import { MapService } from './map.service.js';

const mapService = new MapService(
  new Client({}),
  config.ENV.API.GOOGLE_MAPS_API_KEY,
);

export { convertMetersToKilometers } from './libs/helpers/helpers.js';
export { mapService };
export { type MapService } from './map.service.js';
