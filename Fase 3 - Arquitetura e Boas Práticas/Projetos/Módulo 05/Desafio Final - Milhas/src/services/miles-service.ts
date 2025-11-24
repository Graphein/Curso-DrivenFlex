import { Trip } from "../protocols";
import { findMiles, saveMiles } from "../repositories/miles-repository";
import { calculateMiles } from "./miles-calculator-service";

export async function generateMilesForTrip(trip: Trip) {
  const existingMiles = await findMiles(trip.code);
  if (existingMiles) {
    throw {
      type: "conflict",
      message: `Miles already registered for code ${trip.code}`
    }
  }

  const miles = calculateMiles(trip);
  await saveMiles(trip.code, miles);

  return miles;
}

export async function getMilesFromCode(code: string) {
  const miles = await findMiles(code);
  if (!miles) {
    throw {
      type: "not_found",
      message: `Miles not found for code ${code}`
    }
  }

  return miles;
}