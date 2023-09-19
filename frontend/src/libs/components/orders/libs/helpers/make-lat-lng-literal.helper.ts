const makeLatLngLiteral = (place: string): { lat: number; lng: number } => {
  return {
    lat: Number.parseFloat(place.split(', ')[0]),
    lng: Number.parseFloat(place.split(', ')[1]),
  };
};

export { makeLatLngLiteral };
