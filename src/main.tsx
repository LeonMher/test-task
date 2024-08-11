import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LikesProvider } from './context/LikesContext.tsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<LikesProvider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</LikesProvider>
	</React.StrictMode>
);
