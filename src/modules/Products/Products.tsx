import { ChangeEvent, FC, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
	Box,
	Button,
	Drawer,
	Group,
	Stack,
	Switch,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core'
import { selectTotalProducts, updateViewPreference } from '../../store/slices'
import { ProductGrid, ProductList } from './components'
import { productsData, stockInventory } from '../../data'
import { IconShoppingCart } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { Cart } from '..'
import { DrawerStyles } from '../../styles'

export interface ProductListingProps {}

export const ProductListing: FC<ProductListingProps> = () => {
	const theme = useMantineTheme()

	const currentView = useAppSelector((state) => state.preference.productView)
	const cardProducts = useAppSelector((state) => state.cart.products)
	const cartItemsCount = useAppSelector((state) =>
		selectTotalProducts(state.cart)
	)
	const dispatch = useAppDispatch()

	const [cartOpened, { open: openCart, close: closeCart }] =
		useDisclosure(false)

	const isListView = currentView === 'list'

	const availableProducts = useMemo(() => {
		const inventoryProductIds = stockInventory.map((item) => item.productId)

		const products = productsData.filter((product) =>
			inventoryProductIds.includes(product.id)
		)
		return products
	}, [])

	console.log('availableProducts', availableProducts)

	const handleChangeView = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.checked
		const updateValue = value ? 'list' : 'grid'

		dispatch(updateViewPreference(updateValue))
		// dispatch(emptyCart())
	}

	// const openCart = useCallback(() => {
	// 	openModal()
	// }, [openModal])

	// const closeCart = useCallback(() => {
	// 	// setSelectedData(undefined)
	// 	closeModal()
	// }, [closeModal])

	console.log('cart products', cardProducts)

	return (
		<Stack
			style={{
				marginInline: '48px',
				marginTop: '30px',
				paddingBottom: '50px',
			}}
		>
			<Stack>
				<Group justify='space-between'>
					<Title>
						Welcome to{' '}
						<span
							style={{
								color: theme.colors.violet[7],
							}}
						>
							{' '}
							QuickMart{' '}
						</span>
					</Title>
					<Group>
						<Text>Product View: </Text>
						<Switch
							size='xl'
							onLabel='List'
							offLabel='Grid'
							checked={isListView}
							onChange={handleChangeView}
						/>
					</Group>
				</Group>
				<Group justify='space-between'>
					<Box></Box>
					<Group>
						<Button
							variant='outline'
							leftSection={<IconShoppingCart size={'1rem'} />}
							onClick={() => openCart()}
						>
							Cart ({cartItemsCount})
						</Button>
					</Group>
				</Group>
			</Stack>
			<Stack>
				{isListView ? (
					<ProductList products={availableProducts} />
				) : (
					<ProductGrid products={availableProducts} />
				)}
			</Stack>
			<Drawer
				opened={cartOpened}
				onClose={() => closeCart()}
				{...DrawerStyles.getDrawerStyles('large')}
			>
				<Cart />
			</Drawer>
		</Stack>
	)
}
