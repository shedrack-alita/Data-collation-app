import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MarketplaceState {
  datasets: any[];
  requests: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MarketplaceState = {
  datasets: [],
  requests: [],
  isLoading: false,
  error: null
};

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setDatasets: (state, action: PayloadAction<any[]>) => {
      state.datasets = action.payload;
    },
    setRequests: (state, action: PayloadAction<any[]>) => {
      state.requests = action.payload;
    }
  }
});

export const { setDatasets, setRequests } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;
