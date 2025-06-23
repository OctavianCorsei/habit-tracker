import { useEffect, useState } from 'react'
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import reactLogo from './assets/react.svg'
import { v4 as uuidv4} from 'uuid';
import './App.css'

function App() {

  //habit stores the current value of the input field
  const [habit, setHabit] = useState("");
  //habits stores the list of all added habits
  const [habits, setHabits] = useState([]);
  //store the selected frequency of habit
  const [frequency, setFrequency] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/habits")
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((err) => console.error("Failed to fetch habits:", err));
  }, []);

  //handle marked as done
  const handleCheckIn = (habitId) => {
    fetch(`http://127.0.0.1:5000/habits/${habitId}/checkin`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((updatedHabit) => {
        setHabits((prev) =>
          prev.map((h) => (h.id === updatedHabit.id ? updatedHabit : h))
        );
      })
      .catch((err) => console.log("checkIn failed", err));
  };

  //when the form is submitted: 
  const handleSubmit = (e) => {
    e. preventDefault(); // do not refresh the page
    if(habit.trim() === "" || frequency === "") return; //make sure the input is not empty string or spaces

    //create the habit that i want to be added to the HabitList
    const newHabit = {
      id: uuidv4(),
      name: habit,
      frequency,
      streak: 0,
      dateCreated: new Date().toISOString(),
    };

    fetch("http://127.0.0.1:5000/habits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newHabit),
  })
    .then((res) => res.json())
    .then((data) => {
      setHabits((prev) => [...prev, data]);
      setHabit("");        // reset form
      setFrequency("");    // reset form
    })
    .catch((err) => console.error("Error submitting habit:", err));
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      <HabitForm 
        habit={habit}
        setHabit={setHabit}
        frequency={frequency}
        setFrequency={setFrequency}
        onSubmit={handleSubmit} />
      <HabitList habits={habits} onCheckIn={handleCheckIn}/>
    </div>
  );
}

export default App
