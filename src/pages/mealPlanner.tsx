import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mealsJson from '../mockData/meals.json';
import Day from '../components/day';
import { useForm } from 'react-hook-form';
import ShoppingList from '../components/shoppingList';
import { useDispatch } from 'react-redux';
import { setFormData } from '../reducers/formDataSlice';
import { setSelectedMeals, setMealData } from '../reducers/meals';
import { HiPlusCircle } from "react-icons/hi2";
import { updateIngredientData } from '../reducers/ingredients';

function MealPlanner() {
    const dispatch = useDispatch();

    const [meals, setMeals] = useState<any>([]);
    const [numOfDays, setNumOfDays] = useState(1);

    const { handleSubmit, control } = useForm();

    const onSubmit = (data: any) => {
        const filteredFields: { [key: string]: any } = Object.entries(data).reduce((acc: any, [key, value]) => {
            if (value !== "") {
                acc[key] = value;
            }
            return acc;
        }, {});
        const filteredFieldValues = Object.values(filteredFields);
        dispatch(setFormData({ fields: data }));
        dispatch(setSelectedMeals(filteredFieldValues))
        dispatch(updateIngredientData({ meals, selectedMeals: filteredFieldValues } as any))
    };

    useEffect(() => {
        axios.get('http://localhost:3001/meals')
            .then(response => {
                dispatch(setMealData(response.data.meals));
                setMeals(response.data.meals);
            })
            .catch(error => {
                setMeals(mealsJson.meals)
                console.error('Error fetching data: ', error);
            })
    }, [dispatch]);

    return (
        <div className='p-5'>
            <h1 className='text-[40px] mt-3 mb-5 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 inline-block text-transparent bg-clip-text font-bold'>Meal Planner</h1>
            <div className='flex flex-col sm:flex-row gap-x-10'>
                <div className='flex-1'>
                    <form className="flex flex-row flex-wrap" onSubmit={handleSubmit(onSubmit)}>
                        {control ?
                            [...Array(numOfDays)].map((_, index) => (
                                <div key={index}>
                                    <Day control={control} meals={meals} day={index} />
                                </div>
                            )) : 'missing'
                        }
                        <HiPlusCircle onClick={() => setNumOfDays(numOfDays + 1)} className='text-4xl text-blue-500 cursor-pointer self-end my-2 mx-5' />
                    </form>
                </div>
                <div><ShoppingList /></div>
            </div>
            <footer>
                <button onClick={handleSubmit(onSubmit)} className='mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                    Update Shopping List
                </button>
            </footer>
        </div>
    );
}

export default MealPlanner;