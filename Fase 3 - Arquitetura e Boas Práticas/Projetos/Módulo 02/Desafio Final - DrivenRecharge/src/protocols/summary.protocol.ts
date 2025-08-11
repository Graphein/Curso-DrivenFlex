import type { Phone } from "./phone.protocol";
import type { Carrier } from "./carrier.protocol";
import type { Recharge } from "./recharge.protocol";

export type PhoneSummary = Phone & {
  id: number;
  number: string;
  description: string;
  carrierId: number;
  clientId: number;
  carrier: Carrier | null;
  recharges: Recharge[];
};

export type Summary = {
  document: string;
  phones: PhoneSummary[];
};
