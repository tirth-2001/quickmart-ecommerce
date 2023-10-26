import { Stack, SimpleGrid } from '@mantine/core'
import { FC } from 'react'
import { ProductEntity } from '../../../../entity'
import { ProductCard } from '..'

export interface ProductGridProps {
	products: ProductEntity[]
}

export const ProductGrid: FC<ProductGridProps> = ({ products }) => {
	return (
		<Stack>
			<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl' mt={10}>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</SimpleGrid>
		</Stack>
	)
}
