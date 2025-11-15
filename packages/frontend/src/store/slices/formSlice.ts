import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  forms: any[];
  currentForm: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FormState = {
  forms: [],
  currentForm: null,
  isLoading: false,
  error: null
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<any[]>) => {
      state.forms = action.payload;
    },
    setCurrentForm: (state, action: PayloadAction<any>) => {
      state.currentForm = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setForms, setCurrentForm, setLoading, setError } = formSlice.actions;
export default formSlice.reducer;
