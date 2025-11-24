export type Location = {
  lat: number;
  long: number;
};

export type Trip = {
  code: string;
  origin: Location;
  destination: Location;
  miles: boolean;
  plane: string;
  service: ServiceClass;
  coupom?: string;
  affiliate?: AffiliateStatus;
  date: string; // yyyy-MM-DD
};

export enum ServiceClass {
  ECONOMIC = "ECONOMIC",
  ECONOMIC_PREMIUM = "ECONOMIC_PREMIUM",
  EXECUTIVE = "EXECUTIVE",
  FIRST_CLASS = "FIRST_CLASS"
}

export enum AffiliateStatus {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM"
}

export type Miles = {
  code: string;
  miles: number;
}