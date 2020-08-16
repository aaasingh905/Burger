import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import orderReducer from './Store/Reducers/Order'
import burgerBuilderReducer from './Store/Reducers/burgerBuilder';
import registerServiceWorker from './registerServiceWorker';
import thunk  from 'redux-thunk';
import authReducer from './Store/Reducers/Auth'
//import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const reducer = combineReducers({
    order: orderReducer,
    burgerBuilder: burgerBuilderReducer,
    auth: authReducer
})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

    
const app =(
    <Provider store={store}>
<BrowserRouter>
    <App />
</BrowserRouter>
</Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
