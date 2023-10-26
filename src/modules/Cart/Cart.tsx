import { Stack } from '@mantine/core'
import { FC, Fragment, useMemo } from 'react'
import { CartAmount, CartProducts, CouponCode } from './components'
import { useAppSelector } from '../../store/hooks'
import { productsData } from '../../data'

export interface CartProps {}

export const Cart: FC<CartProps> = () => {
	const { products } = useAppSelector((state) => state.cart)

	const cardProducts = useMemo(() => {
		return productsData.filter((product) => products.includes(product.id))
	}, [products])

	console.log('cardProducts', cardProducts)

	return (
		<Stack m={10} gap={30}>
			<CartProducts products={cardProducts} />
			{products.length > 0 && (
				<Fragment>
					<CouponCode />
					<CartAmount />
				</Fragment>
			)}
		</Stack>
	)
}
