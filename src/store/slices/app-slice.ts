import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrencySymbol = "৳" | "$";

export type ActiveUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AppState = {
  activeUser: ActiveUser | null;
  currencySymbol: CurrencySymbol;
  globalSearchQuery: string;
  token: string | null;
};

// Check for token in localStorage on initial load
const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || null;
  }
  return null;
};

const getInitialUser = (): ActiveUser | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("activeUser");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

const initialState: AppState = {
  activeUser: getInitialUser(),
  currencySymbol: "৳",
  globalSearchQuery: "",
  token: getInitialToken(),
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
    setCredentials(
      state,
      action: PayloadAction<{ user: ActiveUser; token: string }>
    ) {
      state.activeUser = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.token);
        localStorage.setItem("activeUser", JSON.stringify(action.payload.user));
      }
    },
    logout(state) {
      state.activeUser = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("activeUser");
      }
    },
  },
});

export const { setCurrencySymbol, setGlobalSearchQuery, setCredentials, logout } =
  appSlice.actions;
export const appReducer = appSlice.reducer;

