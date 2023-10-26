export type CouponCode = string

export interface CouponEntity {
	code: CouponCode
	discountPercent: number
	name: string
}
