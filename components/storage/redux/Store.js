import {configureStore} from '@reduxjs/toolkit';
import CombineReducer from './CombineReducer';
import createSagaMiddleware from 'redux-saga';
import SagaData from './SagaData';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, CombineReducer);

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(SagaData);
export default store;
