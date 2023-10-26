import { FC, Fragment } from 'react'
import { ProductEntity, ProductId } from '../../../../entity'
import { Button, Group, Image, Stack, Text, Title } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { emptyCart, removeFromCart } from '../../../../store/slices'
import { IconShoppingCart, IconTrash } from '@tabler/icons-react'

export interface CartProductsProps {
	products: ProductEntity[]
}

export const CartProducts: FC<CartProductsProps> = ({ products }) => {
	const dispatch = useAppDispatch()
	const { products: cartProducts } = useAppSelector((state) => state.cart)

	const getProductQuantity = (id: ProductId) => {
		return cartProducts.reduce((acc, curr) => {
			return curr === id ? acc + 1 : acc
		}, 0)
	}

	const handleEmptyCart = () => {
		const confirm = window.confirm('Confirm Empty Cart?')
		if (!confirm) return
		dispatch(emptyCart())
	}

	return (
		<Stack>
			{products.length === 0 ? (
				<Stack
					style={{
						height: '70vh',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<IconShoppingCart size={'3rem'} color='gray' />
					<Text>Your Cart is empty!</Text>
				</Stack>
			) : (
				<Fragment>
					<Group justify='space-between'>
						<Title order={3}>Cart Items</Title>
						<Button color='red' size='xs' onClick={handleEmptyCart}>
							Empty Cart
						</Button>
					</Group>
					{products.map((product) => (
						<Group
							key={product.id}
							justify='space-between'
							align='flex-start'
							style={{
								margin: 10,
								marginLeft: 0,
								borderBottom: '0.5px solid gray',
								paddingBottom: 3,
							}}
						>
							<Group>
								<Image
									src={product.image}
									style={{
										height: 90,
										width: 200,
										objectFit: 'cover',
										aspectRatio: '2/1',
										borderRadius: 8,
									}}
								/>

								<Stack justify='flex-start' gap={7}>
									<Text style={{ fontWeight: 'bold' }}>{product.name}</Text>
									<Text>${product.price}</Text>
									<Text>Quantity: {getProductQuantity(product.id)}</Text>
								</Stack>
							</Group>
							<Stack>
								<Button
									color='red'
									variant='subtle'
									leftSection={<IconTrash size={'1rem'} />}
									onClick={() => dispatch(removeFromCart(product.id))}
									size='xs'
								>
									Remove
								</Button>
							</Stack>
						</Group>
					))}
				</Fragment>
			)}
		</Stack>
	)
}
