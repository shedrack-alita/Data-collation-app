import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  balance: number;
  pendingBalance: number;
  transactions: any[];
  isLoading: boolean;
}

const initialState: WalletState = {
  balance: 0,
  pendingBalance: 0,
  transactions: [],
  isLoading: false
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<{ balance: number; pendingBalance: number }>) => {
      state.balance = action.payload.balance;
      state.pendingBalance = action.payload.pendingBalance;
    },
    setTransactions: (state, action: PayloadAction<any[]>) => {
      state.transactions = action.payload;
    }
  }
});

export const { setBalance, setTransactions } = walletSlice.actions;
export default walletSlice.reducer;
