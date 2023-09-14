import { Client } from '@googlemaps/google-maps-services-js';

import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { MapController } from './map.controller.js';
import { MapService } from './map.service.js';

const mapService = new MapService(
  new Client({}),
  config.ENV.API.GOOGLE_MAPS_API_KEY,
);

const mapController = new MapController({ logger, mapService });

export { mapController, mapService };
