import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { SliceIdentifiers, PersistIdentifiers } from '../constants'
import { CouponEntity, ProductId } from '../../entity'
import {
	getProductById,
	getProductIdCountMap,
	getTotalPriceFromIds,
} from '../../utils/cartUtils'

interface CartState {
	products: string[]
	appliedCoupon: CouponEntity | null
	totalPrice: number
	discountedAmount: number
	netPrice: number
	productsById: Record<ProductId, number>
}

const initialState: CartState = {
	products: [],
	appliedCoupon: null,
	totalPrice: 0,
	discountedAmount: 0,
	netPrice: 0,
	productsById: {},
}

export const cartSlice = createSlice({
	name: SliceIdentifiers.Cart,
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ProductId>) => {
			try {
				console.log('action.payload', action.payload, state.productsById)

				state.products.push(action.payload)
				const product = getProductById(action.payload)
				state.totalPrice += product?.price ?? 0
				state.netPrice = state.totalPrice
				state.productsById = getProductIdCountMap(state.products)
			} catch (e) {
				console.log(e)
			}
		},
		removeFromCart: (state, action: PayloadAction<ProductId>) => {
			state.products = state.products.filter(
				(product) => product !== action.payload
			)
			state.productsById = getProductIdCountMap(state.products)

			const totalPrice = getTotalPriceFromIds(state.products)
			state.totalPrice = totalPrice
			if (state.appliedCoupon) {
				const discountAmount =
					(state.totalPrice * state.appliedCoupon.discountPercent) / 100
				state.discountedAmount = discountAmount
				state.netPrice = state.totalPrice - discountAmount
			} else {
				state.netPrice = totalPrice
			}
		},
		applyCouponCode: (state, action: PayloadAction<CouponEntity | null>) => {
			const coupon = action.payload
			state.appliedCoupon = coupon

			if (coupon) {
				const discountAmount = (state.totalPrice * coupon.discountPercent) / 100
				state.discountedAmount = discountAmount
				state.netPrice = state.totalPrice - discountAmount
			} else {
				state.discountedAmount = 0
				state.netPrice = state.totalPrice
			}
		},
		emptyCart: (state) => {
			state.products = []
			state.appliedCoupon = null
			state.totalPrice = 0
			state.discountedAmount = 0
			state.netPrice = 0
		},
	},
})

export const { addToCart, removeFromCart, applyCouponCode, emptyCart } =
	cartSlice.actions

const persistConfig = {
	key: PersistIdentifiers.Cart,
	storage,
}

// Create a persisted reducer
export const persistedCartReducer = persistReducer(
	persistConfig,
	cartSlice.reducer
)

export const selectTotalProducts = (state: CartState) =>
	new Set(state.products).size

export const cartReducer = persistedCartReducer
