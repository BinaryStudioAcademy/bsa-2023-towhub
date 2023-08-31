type TruckEntity = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  manufacturer: string;
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: string;
  towType: string;
};

export { type TruckEntity };
