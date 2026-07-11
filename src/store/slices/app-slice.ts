import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrencySymbol = "৳" | "$";

export type ActiveUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AppState = {
  activeUser: ActiveUser;
  currencySymbol: CurrencySymbol;
  globalSearchQuery: string;
};

const initialState: AppState = {
  activeUser: {
    id: "admin-1",
    name: "Emon Mahmud",
    email: "admin@plaxora.local",
    role: "Super Admin",
  },
  currencySymbol: "৳",
  globalSearchQuery: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrencySymbol(state, action: PayloadAction<CurrencySymbol>) {
      state.currencySymbol = action.payload;
    },
    setGlobalSearchQuery(state, action: PayloadAction<string>) {
      state.globalSearchQuery = action.payload;
    },
  },
});

export const { setCurrencySymbol, setGlobalSearchQuery } = appSlice.actions;
export const appReducer = appSlice.reducer;
