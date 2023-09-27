type RouteData = {
  origin: string | null;
  destination: string | null;
  distanceAndDuration: {
    distance: { text: string; value: number };
    duration: { text: string; value: number };
  } | null;
};

export { type RouteData };
