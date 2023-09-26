type OrderCalculatePriceRequestDto = {
  startAddress: string | google.maps.LatLngLiteral;
  endAddress: string | google.maps.LatLngLiteral;
  pricePerKm: number;
};

export { type OrderCalculatePriceRequestDto };
