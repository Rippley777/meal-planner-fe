import "tailwindcss/tailwind.css"
import { Provider } from 'react-redux';
import MealPlanner from './pages/mealPlanner';
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <MealPlanner />
    </Provider>
  );
}

export default App;