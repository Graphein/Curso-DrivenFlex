export type Coupon = {
    id: number;
    title: string;
    code: string;
    site: string;
  }
  
  export type CouponCreateData = Omit<Coupon, "id">;