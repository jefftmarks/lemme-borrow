import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ActiveUserProvider } from './context/active_user';
import { Provider } from "react-redux";
import App from './App';
import store from "./store";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
		<Provider store={store}>
			<ActiveUserProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ActiveUserProvider>
		</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);