const makeLatLngLiteral = (place: string): google.maps.LatLngLiteral => {
  return {
    lat: Number.parseFloat(place.split(', ')[0]),
    lng: Number.parseFloat(place.split(', ')[1]),
  };
};

export { makeLatLngLiteral };
