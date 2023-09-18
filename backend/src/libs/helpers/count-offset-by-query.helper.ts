const countOffsetByQuery = ({
  page,
  size,
}: {
  page: number;
  size: number;
}): number => {
  return page * size;
};

export { countOffsetByQuery };
