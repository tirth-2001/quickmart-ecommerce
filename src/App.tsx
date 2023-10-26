import '@mantine/core/styles.css'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import { ProductListing } from './modules'

function App() {
	return (
		<MantineProvider
			theme={{
				primaryColor: 'violet',
			}}
		>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<ProductListing />
				</PersistGate>
			</Provider>
		</MantineProvider>
	)
}

export default App
