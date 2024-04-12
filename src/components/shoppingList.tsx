import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
}

const ShoppingList: React.FC<Props> = () => {
    const { ingredients } = useSelector((state: any) => state.ingredientData);

    if (ingredients.length === 0) {
        return <div>Add some meals to your plan to see the shopping list.</div>;
    }
    return (
        <div className='p-5 pb-0 bg-white rounded-md max-h-[75vh] overflow-auto'>
            <div className='text-lg font-bold my-2'>Shopping List</div>
            <div className='pb-5'>{ingredients.map((ingredient: any, index: number) => <div key={index}>{ingredient.name} - {ingredient.quantity}</div>) || <div>No ingredients</div>}</div>
            {ingredients && ingredients.length > 20 ? <div className='bg-gradient-to-b from-transparent to-white sticky h-24 bottom-0 left-0 right-0'></div> : null}
        </div>
    );
};

export default ShoppingList;