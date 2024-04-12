import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mealData: [],
};

const mealSlice = createSlice({
    name: 'mealData',
    initialState,
    reducers: {
        setMealData: (state, action) => {
            state.mealData = action.payload;
        },
        setSelectedMeals: (state, action) => {
            state.selectedMeals = action.payload;
        },
    },
});

export const { setMealData, setSelectedMeals } = mealSlice.actions;
export default mealSlice.reducer;