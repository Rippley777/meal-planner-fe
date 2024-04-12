import { combineReducers } from 'redux';
import formDataSlice from './formDataSlice';
import meals from './meals';
import ingredients from './ingredients';


const rootReducer = combineReducers({
    formData: formDataSlice,
    meals: meals,
    ingredientData: ingredients,
});

export default rootReducer;