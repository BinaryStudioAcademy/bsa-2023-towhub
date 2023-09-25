const FormName = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PHONE: 'phone',
  PASSWORD: 'password',
  DRIVER_LICENSE_NUMBER: 'driverLicenseNumber',
  DRIVER_POSSIBLE_TRUCKS: 'truckIds',
  COMPANY_NAME: 'companyName',
  TAX_NUMBER: 'taxNumber',
  LICENSE_PLATE: 'licensePlateNumber',
  MANUFACTURER: 'manufacturer',
  YEAR: 'year',
  CAPACITY: 'capacity',
  PRICE_PER_KM: 'pricePerKm',
  DRIVERS: 'drivers',
  TOW_TYPE: 'towType',
} as const;

const FormLabel = {
  FIRST_NAME: 'First name',
  LAST_NAME: 'Last name',
  EMAIL: 'Email',
  PHONE: 'Phone',
  PASSWORD: 'Password',
  DRIVER_LICENSE_NUMBER: 'Driver license number',
  DRIVER_POSSIBLE_TRUCKS: 'Choose Possible Trucks for Driver',
  COMPANY_NAME: 'Company name',
  TAX_NUMBER: 'Tax number',
  LICENSE_PLATE: 'License Plate',
  MANUFACTURER: 'Manufacturer',
  YEAR: 'Year',
  CAPACITY: 'Capacity',
  PRICE_PER_KM: 'Price per km',
  DRIVERS: 'Drivers',
  TOW_TYPE: 'Tow Type',
} as const;

export { FormLabel, FormName };
