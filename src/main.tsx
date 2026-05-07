import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './contexts/UserProvider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserProvider>
	</StrictMode>,
)
