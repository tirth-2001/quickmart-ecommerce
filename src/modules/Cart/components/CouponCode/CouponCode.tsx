import { FC, useState } from 'react'
import { Button, Group, Input, Stack, Title, Text } from '@mantine/core'
import { couponList } from '../../../../data'
import { CouponEntity } from '../../../../entity'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { applyCouponCode } from '../../../../store/slices'

export interface CouponCodeProps {}

export const CouponCode: FC<CouponCodeProps> = () => {
	const { appliedCoupon } = useAppSelector((state) => state.cart)
	const dispatch = useAppDispatch()

	const setAppliedCoupon = (coupon: CouponEntity | null) => {
		dispatch(applyCouponCode(coupon))
	}

	const [couponText, setCouponText] = useState('')

	const ApplyCoupon = () => {
		const handleApplyCoupon = () => {
			if (appliedCoupon) {
				setCouponText('')
				setAppliedCoupon(null)
				return
			}
			const coupon = couponList.find(
				(coupon) => coupon.code === couponText.trim().toUpperCase()
			)
			if (coupon) {
				setAppliedCoupon(coupon)
			} else {
				setAppliedCoupon(null)
			}
		}
		return (
			<Button variant='outline' onClick={handleApplyCoupon}>
				{appliedCoupon ? 'Remove' : 'Apply'}
			</Button>
		)
	}

	const CouponHint = () => {
		return (
			<Text style={{ fontSize: 14, marginBlock: -5, color: 'gray' }}>
				Coupon Hints: {couponList.map((coupon) => coupon.code).join(', ')}
			</Text>
		)
	}

	return (
		<Stack>
			<Title order={3}>Coupon Code</Title>

			<Group>
				<Input
					value={couponText}
					onChange={(e) => setCouponText(e.target.value.toUpperCase())}
					placeholder='Enter Coupon Code'
				/>
				<ApplyCoupon />
			</Group>
			<CouponHint />

			{appliedCoupon && (
				<Text style={{ color: 'green' }}>
					<span style={{ fontWeight: 'bold' }}>{appliedCoupon.code}</span>{' '}
					applied for {appliedCoupon.discountPercent}% discount{' '}
				</Text>
			)}
		</Stack>
	)
}
