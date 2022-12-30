import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from 'twin.macro';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import router from './router/router';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<GlobalStyles />
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
