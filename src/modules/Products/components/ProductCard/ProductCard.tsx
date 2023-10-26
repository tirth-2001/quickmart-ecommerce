import {
	Button,
	Card,
	Group,
	Stack,
	rem,
	Image,
	Text,
	useMantineTheme,
	Badge,
} from '@mantine/core'
import { FC, memo, useCallback, useMemo, useState } from 'react'
import { ProductEntity, ProductId } from '../../../../entity'
import { productsData, stockInventory } from '../../../../data'
import { addToCart, removeFromCart } from '../../../../store/slices'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { IconShoppingCartPlus, IconTrash } from '@tabler/icons-react'

export interface ProductCardProps {
	product: ProductEntity
}

export const ProductCard: FC<ProductCardProps> = memo((props) => {
	const theme = useMantineTheme()
	const { product: baseProduct } = props

	const [currentProductId, setCurrentProductId] = useState(baseProduct.id)

	const dispatch = useAppDispatch()
	const cardProducts = useAppSelector((state) => state.cart.products)
	const productsById = useAppSelector((state) => state.cart.productsById)

	console.log('productsById', productsById)

	const currentProductCartCount = useMemo(
		() => productsById[currentProductId],
		[currentProductId, productsById]
	)

	const product = useMemo(() => {
		return productsData.find((product) => product.id === currentProductId)
	}, [currentProductId])

	const checkVariantStock = useCallback((id: ProductId) => {
		return (
			(stockInventory.find((stock) => stock.productId === id)?.quantityLimit ??
				0) > 0
		)
	}, [])

	if (!product) return null

	return (
		<Card
			key={product.id}
			radius='lg'
			style={{
				border: `${rem(1)} solid ${theme.colors.gray[2]}`,
				boxShadow: theme.shadows.lg,
				transition: 'all 0.3s ease-in-out',
				height: rem(570),

				'&:hover': {
					borderRadius: rem(30),
					boxShadow: theme.shadows.lg,
					transition: 'all 0.3s ease-in-out',
					border: `${rem(1)} solid ${theme.colors.gray[5]}`,
				},
			}}
			padding={0}
			pb={'sm'}
		>
			<Image
				src={product.image}
				style={{
					objectFit: 'cover',
					marginInline: 'auto',
					aspectRatio: '2/1',
					height: '200px',
				}}
			/>
			<Stack p={'md'} justify='space-between' style={{ height: 'inherit' }}>
				<Stack>
					<Badge
						color='teal'
						// variant='light'
						size='sm'
						style={{
							visibility: cardProducts.includes(product.id)
								? 'visible'
								: 'hidden',
						}}
					>
						Added to Cart{' '}
						{currentProductCartCount ? `(${currentProductCartCount})` : null}
					</Badge>
					<Text style={{ fontWeight: 'bold', fontSize: '18px' }}>
						{product.name}
					</Text>
					<Text>${product.price}</Text>
					<Text>
						{product.description.length > 80
							? `${product.description.slice(0, 80)}...`
							: product.description}
					</Text>
					<Text>
						Stock :{' '}
						{
							stockInventory.find((stock) => stock.productId === product.id)
								?.quantityLimit
						}
					</Text>
				</Stack>
				{(product.variants?.length ?? 0) > 0 && (
					<Group>
						<Text>Available Variants</Text>
						<Group>
							{product.variants?.map((variant) => (
								<>
									{checkVariantStock(variant.productId) && (
										<Button
											size='xs'
											radius={'lg'}
											key={variant.productId}
											variant={
												product.id === variant.productId ? 'filled' : 'outline'
											}
											onClick={() => setCurrentProductId(variant.productId)}
										>
											{variant.variantName}
										</Button>
									)}
								</>
							))}
						</Group>
					</Group>
				)}

				<Group>
					<Button
						size='xs'
						leftSection={<IconShoppingCartPlus size={16} />}
						onClick={() => dispatch(addToCart(product.id))}
					>
						Add to Cart
					</Button>
					{cardProducts.includes(product.id) && (
						<Button
							color='red'
							size='xs'
							variant='outline'
							leftSection={<IconTrash size={16} />}
							onClick={() => dispatch(removeFromCart(product.id))}
						>
							Remove from Cart
						</Button>
					)}
				</Group>
			</Stack>
		</Card>
	)
})
