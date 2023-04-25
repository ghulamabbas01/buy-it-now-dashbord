import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  user: null,
  count: 0,
  currency: "USD",
  symbol: "US$",
  unitRate: null,
  mode: "light",
  language: "en",
  isInitialized: false,
};

const slice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    setLogin(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLogout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setCurrency(state, action) {
      state.currency = action.payload.prefix;
      state.symbol = action.payload.symbol;
    },
    setInitialize(state) {
      state.isInitialized = true;
    },

    setUnitRate(state, action) {
      state.unitRate = action.payload;
    },
    setCount(state) {
      state.count = state.count + 1;
    },
    setThemeMode(state, action) {
      state.mode = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setLogin,
  setLogout,
  setCount,
  setCurrency,
  setUnitRate,
  setInitialize,
  setThemeMode,
} = slice.actions;

// ----------------------------------------------------------------------
