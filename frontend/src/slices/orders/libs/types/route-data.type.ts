type RouteData = {
  origin: string | null;
  destination: string | null;
  startPoint: google.maps.LatLngLiteral | null;
  endPoint: google.maps.LatLngLiteral | null;
  distanceAndDuration: {
    distance: { text: string; value: number };
    duration: { text: string; value: number };
  } | null;
};

export { type RouteData };
