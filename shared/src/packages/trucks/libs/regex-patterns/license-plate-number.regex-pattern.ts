import { TruckLicensePlateNumber } from '../enums/enums.js';

const LICENSE_PLATE_NUMBER = new RegExp(
  `^(?!.*\\s)[\\dA-ZЁА-Я-]{${TruckLicensePlateNumber.MIN},${TruckLicensePlateNumber.MAX}}$`,
);

export { LICENSE_PLATE_NUMBER };
