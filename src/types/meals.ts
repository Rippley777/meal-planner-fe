export type Ingredient = {
    name: string;
    quantity: string;
  };
  
  export type Meal = {
    name: string;
    type: string;
    ingredients: Ingredient[];
  };