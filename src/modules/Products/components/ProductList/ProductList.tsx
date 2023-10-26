import { Stack, Group, Table, ActionIcon } from '@mantine/core'
import { FC } from 'react'
import { ProductEntity } from '../../../../entity'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { addToCart, removeFromCart } from '../../../../store/slices'
import {
	IconShoppingCartMinus,
	IconShoppingCartPlus,
} from '@tabler/icons-react'

export interface ProductListProps {
	products: ProductEntity[]
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
	const dispatch = useAppDispatch()
	const cardProducts = useAppSelector((state) => state.cart.products)

	const rows = products.map((product) => (
		<Table.Tr key={product.id}>
			<Table.Td>{product.name}</Table.Td>
			<Table.Td>${product.price}</Table.Td>
			<Table.Td>{product.description.slice(0, 50)}</Table.Td>
			<Table.Td>{product.rating}</Table.Td>
			<Table.Td>{product.brand}</Table.Td>
			<Table.Td>
				<Group>
					<ActionIcon onClick={() => dispatch(addToCart(product.id))}>
						<IconShoppingCartPlus size={20} />
					</ActionIcon>
					{cardProducts.includes(product.id) && (
						<ActionIcon
							color='red'
							onClick={() => dispatch(removeFromCart(product.id))}
						>
							<IconShoppingCartMinus size={20} />
						</ActionIcon>
					)}
				</Group>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<Stack>
			<Table verticalSpacing='sm' striped highlightOnHover>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Name</Table.Th>
						<Table.Th>Price</Table.Th>
						<Table.Th>Description</Table.Th>
						<Table.Th>Rating</Table.Th>
						<Table.Th>Brand</Table.Th>
						<Table.Th>Action</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Stack>
	)
}
