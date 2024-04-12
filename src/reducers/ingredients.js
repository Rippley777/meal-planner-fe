import { createSlice } from '@reduxjs/toolkit';
function onlyLetters(str) {
    return str.replace(/[^a-zA-Z]/g, '');
}
function onlyNumbers(str) {
    return Number(str.replace(/[^0-9]/g, ''));
}
function lettersAndSpaces(str) {
    return str.replace(/[^a-zA-Z\s]/g, '');
}
const isSmallAmount = (amount) => {
    return amount === 'Small Amount' || amount === 'to taste' || amount === 'for garnish' || amount === 0
}
const handleAddAmount = (prev, curr) => {
    console.log({ prev, curr })
    if (!prev) {
        return curr;
    }
    if (isSmallAmount(prev)) {
        if (isSmallAmount(curr)) {
            return 'Small Amount';
        } else {
            return curr;
        }
    }
    if (isSmallAmount(curr)) {
        if (isSmallAmount(prev)) {
            return 'Small Amount';
        } else {
            return prev;
        }
    }
    if (onlyLetters(prev) === onlyLetters(curr)) {
        console.log('match', onlyNumbers(prev), onlyNumbers(curr), onlyNumbers(prev) === 1 && onlyNumbers(curr) > 0)
        return `${Number(onlyNumbers(prev)) + Number(onlyNumbers(curr))}${lettersAndSpaces(prev)}${lettersAndSpaces(prev) && onlyNumbers(prev) === 1 && onlyNumbers(curr) > 0 ? 's' : ''}`;

    }
    // acc[ingredient.name].amount += ingredient.amount;
}
const initialState = {
    ingredients: [],
};

const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        updateIngredientData: (state, action) => {
            const compiledIngredients = action.payload.selectedMeals.map((selectedMeal) => {
                return action.payload.meals.find((meal) => meal.name === selectedMeal).ingredients;
            }).flat();
            const compiledIngredientsByItem = compiledIngredients.reduce((acc, ingredient) => {
                if (acc[ingredient.name]) {
                    console.log({ ingredient: ingredient.name })
                    acc[ingredient.name] = { name: ingredient.name, quantity: handleAddAmount(acc[ingredient.name].quantity, ingredient.quantity) }
                } else {
                    acc[ingredient.name] = ingredient;
                }
                return acc;
            }, {});
            const majorIngredientsSorted = Object.values(compiledIngredientsByItem).filter((ingredient) => !isSmallAmount(ingredient.quantity)).sort((a, b) => a.name.localeCompare(b.name));
            const minorIngredientsSorted = Object.values(compiledIngredientsByItem).filter((ingredient) => isSmallAmount(ingredient.quantity)).sort((a, b) => a.name.localeCompare(b.name));
            state.ingredients = [...majorIngredientsSorted, ...minorIngredientsSorted];
        },
    },
});

export const { setIngredientData, updateIngredientData } = ingredientSlice.actions;
export default ingredientSlice.reducer;
