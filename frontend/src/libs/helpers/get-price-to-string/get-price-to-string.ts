const getPriceToString = (price: number): string => {
  return (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export { getPriceToString };
