import { useState } from 'react'
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  //habit stores the current value of the input field
  const [habit, setHabit] = useState("");
  //habits stores the list of all added habits
  const [habits, setHabits] = useState([]);

  //when the form is submitted: 
  const handleSubmit = (e) => {
    e. preventDefault(); // do not refresh the page
    if(habit.trim() === "") return; //make sure the input is not empty string or spaces
    setHabits([...habits, {name: habit, id: Date.now() }]); //add the habit to the list of habits 
    setHabit(""); //clears input
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      <HabitForm habit={habit} setHabit={setHabit} onSubmit={handleSubmit} />
      <HabitList habits={habits} />
    </div>
  );
}

export default App
