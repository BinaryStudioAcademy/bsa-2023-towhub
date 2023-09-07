const FormLabel = {
  LICENSE_PLATE: 'License Plate',
  MANUFACTURER: 'Manufacturer',
  YEAR: 'Year',
  CAPACITY: 'Capacity',
  PRICE_PER_KM: 'Price per km',
  DRIVERS: 'Drivers',
  TOW_TYPE: 'Tow Type',
} as const;

const FormName = {
  LICENSE_PLATE: 'licensePlateNumber',
  MANUFACTURER: 'manufacturer',
  YEAR: 'year',
  CAPACITY: 'capacity',
  PRICE_PER_KM: 'pricePerKm',
  DRIVERS: 'drivers',
  TOW_TYPE: 'towType',
} as const;

export { FormLabel, FormName };
