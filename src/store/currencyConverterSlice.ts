import { createSlice } from '@reduxjs/toolkit';

export interface currencyConverterState {
  from: string
  to: string
  fromValue:string
  // toValue:string
}

const initialState: currencyConverterState = {
  from: 'USD',
  to: 'EUR',
  fromValue:'100'
};

export const currencyConverterSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: { 
    chooseFrom: (state, action) => {
      state.from = action.payload
    },
    chooseTo: (state, action) => {
      state.to = action.payload
    }
  },
});

export const { chooseFrom, chooseTo } = currencyConverterSlice.actions;

export default currencyConverterSlice.reducer;
