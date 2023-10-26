import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { SliceIdentifiers, PersistIdentifiers } from '../constants'

export type ProductView = 'grid' | 'list'

interface CartState {
	productView: ProductView
}

const initialState: CartState = {
	productView: 'grid',
}

export const preferenceSlice = createSlice({
	name: SliceIdentifiers.Preference,
	initialState,
	reducers: {
		updateViewPreference: (state, action: PayloadAction<ProductView>) => {
			state.productView = action.payload
		},
	},
})

export const { updateViewPreference } = preferenceSlice.actions

const persistConfig = {
	key: PersistIdentifiers.Preference,
	storage,
}

// Create a persisted reducer
export const persistedPreferenceReducer = persistReducer(
	persistConfig,
	preferenceSlice.reducer
)

export const preferenceReducer = persistedPreferenceReducer
