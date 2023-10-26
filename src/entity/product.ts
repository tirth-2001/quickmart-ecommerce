export type ProductId = string

export interface ProductVariant {
	productId: ProductId
	variantName: string
}

export interface ProductEntity {
	id: ProductId
	name: string
	description: string
	price: number
	rating: number
	brand: string
	category: string
	image: string
	variants?: ProductVariant[]
}
