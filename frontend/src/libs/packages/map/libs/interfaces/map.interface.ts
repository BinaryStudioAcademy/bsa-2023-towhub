interface IMapService {
  calculateRouteAndTime(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
  ): Promise<number>;
  calculateDistance(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
  ): Promise<number>;
  addMarker(position: google.maps.LatLngLiteral, label?: string): void;
}

export { type IMapService };
