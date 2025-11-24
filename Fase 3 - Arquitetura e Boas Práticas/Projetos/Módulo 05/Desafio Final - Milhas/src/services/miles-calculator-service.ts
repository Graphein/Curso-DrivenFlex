import { AffiliateStatus, ServiceClass, Trip } from "../protocols";
import { calculateDistance } from "./distances-calculator-service";

export function calculateMiles(trip: Trip) {
  let miles = 0;
  const { miles: usingMiles } = trip;
  if (!usingMiles) {
    // calculate
    const distance = calculateDistance(trip.origin, trip.destination);
    const serviceClassMultiplier = calculateServiceClassMultiplier(trip.service);
    const affiliateBonus = calculateAffiliateBonus(trip.affiliate);
    const birthdayMonthBonus = calculateBirthdayBonus(new Date(trip.date));

    // apply
    miles = distance * serviceClassMultiplier;
    miles = miles + (miles * affiliateBonus);
    miles = miles + (miles * birthdayMonthBonus);
  }

  miles = Math.round(miles);
  return miles;
}

function calculateServiceClassMultiplier(serviceClass: ServiceClass) {
  const classes = {
    ECONOMIC: 1,
    ECONOMIC_PREMIUM: 1.25,
    EXECUTIVE: 1.5,
    FIRST_CLASS: 2
  };

  return classes[serviceClass];
}

function calculateAffiliateBonus(affiliate: AffiliateStatus) {
  const status = {
    BRONZE: 0,
    SILVER: 0.1,
    GOLD: 0.25,
    PLATINUM: 0.5
  }

  return status[affiliate];
}

function calculateBirthdayBonus(date: Date) {
  const MAY = 5;
  if (date.getMonth() + 1 === MAY) {
    return 0.1;
  }

  return 0;
}