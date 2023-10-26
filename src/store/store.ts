import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { PersistIdentifiers } from './constants'
import { cartReducer, preferenceReducer } from './slices'
import { persistReducer, persistStore } from 'redux-persist'

const rootReducer = combineReducers({
	[PersistIdentifiers.Cart]: cartReducer,
	[PersistIdentifiers.Preference]: preferenceReducer,
})

const persistConfig = {
	key: PersistIdentifiers.Root,
	storage,
}

const persistRootReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistRootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
