const getResultIfTruthy = <T, EntityT>(
  result: T,
  callback: (entity: T) => EntityT,
): EntityT | null => {
  if (result) {
    return callback(result);
  }

  return null;
};

export { getResultIfTruthy };
