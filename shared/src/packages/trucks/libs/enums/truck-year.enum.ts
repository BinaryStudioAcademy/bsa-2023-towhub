const startYear = 2011;
const endYear = 2023;

const TruckYear: Record<number, string> = {};

for (let year = startYear; year <= endYear; year++) {
  TruckYear[year] = year.toString();
}

export { TruckYear };
