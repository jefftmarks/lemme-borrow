import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ActiveUserProvider } from './context/active_user';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
		<ActiveUserProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ActiveUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);