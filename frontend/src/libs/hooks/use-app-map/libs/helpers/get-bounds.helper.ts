const getBounds = (
  points: google.maps.LatLngLiteral[],
): google.maps.LatLngBounds => {
  const bounds = new google.maps.LatLngBounds();

  for (const point of points) {
    bounds.extend(point);
  }

  return bounds;
};

export { getBounds };
