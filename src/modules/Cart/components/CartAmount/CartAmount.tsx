import { Group, Stack, Title, Text, Button } from '@mantine/core'
import { FC } from 'react'
import { useAppSelector } from '../../../../store/hooks'
import { IconArrowBigRightLineFilled } from '@tabler/icons-react'

export interface CartAmountProps {}

const BillingAmount = ({
	title,
	amount,
	final = false,
}: {
	title: string
	amount: number
	final?: boolean
}) => {
	return (
		<Group w={300} justify='space-between'>
			<Text style={{ color: final ? 'green' : 'black' }}>{title}</Text>
			<Text style={{ fontWeight: 'bold', color: final ? 'green' : 'black' }}>
				${amount}
			</Text>
		</Group>
	)
}

export const CartAmount: FC<CartAmountProps> = () => {
	const { totalPrice, discountedAmount, netPrice } = useAppSelector(
		(state) => state.cart
	)

	return (
		<Stack mb={40}>
			<Title order={3}>Billing Details</Title>
			<Stack>
				<BillingAmount title='Gross Total' amount={totalPrice} />
				<BillingAmount title='Discount' amount={discountedAmount} />
				<BillingAmount title='Taxes and Other' amount={0} />
				<BillingAmount title='Net Payable Amount' amount={netPrice} final />
			</Stack>
			<Button
				mt={'xl'}
				size='lg'
				radius={'md'}
				leftSection={<IconArrowBigRightLineFilled />}
			>
				Proceed to Checkout
			</Button>
		</Stack>
	)
}
