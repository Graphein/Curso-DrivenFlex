import { Location } from "../protocols";

const RADIUS_IN_MILES = 3958.8;
const RADIUS_IN_KM = 6371;

export function calculateDistance(coords1: Location, coords2: Location, isMiles = false) {
  const radius = isMiles ? RADIUS_IN_MILES : RADIUS_IN_KM;
  const dLat = toRadius(coords2.lat - coords1.lat);
  const dLon = toRadius(coords2.long - coords1.long);
  const lat1 = toRadius(coords1.lat);
  const lat2 = toRadius(coords2.lat);

  let distance = applyHaversineFormula(lat1, lat2, dLat, dLon, radius);
  return Math.round(distance);
}

export function toRadius(angle: number) {
  return (angle * Math.PI) / 180;
}

export function applyHaversineFormula(lat1: number, lat2: number, dLat: number, dLon: number, radius: number) {
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) *
    Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radius * c;
}