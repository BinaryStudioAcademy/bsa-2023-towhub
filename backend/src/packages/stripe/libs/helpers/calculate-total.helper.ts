const calculateTotal = ({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}): number => {
  return price * quantity;
};

export { calculateTotal };
