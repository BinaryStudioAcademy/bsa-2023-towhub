const jsonToLatLngLiteral = (point: string): google.maps.LatLngLiteral => {
  const { lat, lng } = JSON.parse(point) as { lat: string; lng: string };

  return { lat: Number(lat), lng: Number(lng) };
};

export { jsonToLatLngLiteral };
