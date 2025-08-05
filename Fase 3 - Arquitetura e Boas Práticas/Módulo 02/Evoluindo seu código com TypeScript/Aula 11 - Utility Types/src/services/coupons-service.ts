// TODO Remover o any
let coupons: any = [];

export function findCoupons() {
  return coupons;
}

export function insertCoupon(coupon) {
  coupons.push({
    id: coupons.length,
    ...coupon
  });
}

