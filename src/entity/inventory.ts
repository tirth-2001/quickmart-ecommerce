import { ProductId } from './product'

export interface InventoryEntity {
	productId: ProductId
	quantityLimit: number
}
