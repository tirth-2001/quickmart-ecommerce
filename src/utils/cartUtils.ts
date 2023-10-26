import { productsData } from '../data'
import { ProductEntity, ProductId } from '../entity'

export function getTotalPriceFromIds(products: string[]): number {
	return products.reduce((total, id) => {
		const product = productsData.find((product) => product.id === id)
		return total + (product?.price ?? 0)
	}, 0)
}

export function getProductById(
	productId: ProductId
): ProductEntity | undefined {
	return productsData.find((product) => product.id === productId)
}

export function getProductIdCountMap(
	products: string[]
): Record<ProductId, number> {
	return products.reduce((acc, curr) => {
		acc[curr] = (acc[curr] ?? 0) + 1
		return acc
	}, {} as Record<ProductId, number>)
}
