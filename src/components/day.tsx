import { Control, FieldValues } from 'react-hook-form';
import { Meal } from '../types/meals';
import DropdownByType from './dropdowns/byType';

type ByTypeDropdownProps = {
    day: number;
    meals: Meal[];
    control: Control<FieldValues, any>;
    //   types: string[];
};
function Day({ day, control, meals }: ByTypeDropdownProps) {

    return (
        <div>
            <DropdownByType control={control} day={day} meals={meals} types={["Breakfast"]} />
            <DropdownByType control={control} day={day} meals={meals} types={["Lunch", "Soup", "Salad"]} />
            <DropdownByType control={control} day={day} meals={meals} types={["Dinner", "Soup", "Salad"]} />

        </div>
    );
}

export default Day;