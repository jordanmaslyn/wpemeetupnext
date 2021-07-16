export const radiansToDegrees = (radians: number): number => radians * (180 / Math.PI);
export const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180);

export interface Point {
  lat: number;
  lng: number;
}

export function getDistanceFromOrigin(origin: Point, comparison: Point) {
  const theta = origin.lng - comparison.lng;
  let distance =
    Math.sin(degreesToRadians(origin.lat)) * Math.sin(degreesToRadians(comparison.lat)) +
    Math.cos(degreesToRadians(origin.lat)) *
      Math.cos(degreesToRadians(comparison.lat)) *
      Math.cos(degreesToRadians(theta));
  distance = Math.acos(distance);
  distance = radiansToDegrees(distance);
  const miles = distance * 60 * 1.1515;

  return miles;
}
