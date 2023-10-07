import { configureStore } from '@reduxjs/toolkit';
import { legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
import { punkReducer } from '../reducer/reducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, punkReducer)

export const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export const persistor = persistStore(store);
