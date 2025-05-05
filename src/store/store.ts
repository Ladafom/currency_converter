import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { currencyConverterApi } from './currencyConverterApi';
import currencyConverterReducer from './currencyConverterSlice';

export const rootReducer = combineReducers({
  currencyConverter:currencyConverterReducer,
  [currencyConverterApi.reducerPath]: currencyConverterApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        currencyConverterApi.middleware
      ),
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;