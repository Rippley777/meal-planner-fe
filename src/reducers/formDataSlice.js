import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formData: {},
};

const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setSelectedMeals: (state, action) => {
            state.selectedMeals = action.payload;
        },
    },
});

export const { setFormData } = formDataSlice.actions;
export default formDataSlice.reducer;