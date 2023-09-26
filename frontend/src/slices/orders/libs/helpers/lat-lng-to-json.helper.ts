const latLngToJson = (point: google.maps.LatLngLiteral): string => {
  return JSON.stringify(point);
};

export { latLngToJson };
