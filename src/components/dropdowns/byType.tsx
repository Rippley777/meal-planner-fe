import { Control, Controller, FieldValues } from 'react-hook-form';
import { Meal } from '../../types/meals';

type DropdownByTypeProps = {
    control: Control<FieldValues, any>;
    day: number;
    meals: Meal[];
    types: string[];
};
function DropdownByType({ control, day, meals, types }: DropdownByTypeProps) {
    return (
        <div className='m-3'>
            <div className='font-bold'>{types[0]}</div>
            <Controller
                name={`${types[0]}-dropdown-${day}`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <select {...field} className='cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
                        <option value="">Select meal...</option>
                        {meals.filter(meal => types.indexOf(meal.type) >= 0).map((meals: any, index: number) => (
                            <option value={meals.name} key={index}>{meals.name}</option>
                        ))}
                    </select>)}
            />
        </div>
    );
}

export default DropdownByType;