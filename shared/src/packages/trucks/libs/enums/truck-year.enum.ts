const START_YEAR = 2011;
const END_YEAR = 2023;

const TruckYear = Object.fromEntries(
  Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, index) => {
    const year = START_YEAR + index;

    return [`${year}`, year.toString()];
  }),
);

export { TruckYear };
