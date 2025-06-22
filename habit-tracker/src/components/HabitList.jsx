import Habit from "./Habit";

function HabitList({ habits }) {
    return (
        <ul>
            {habits.map((h) => (
                <li key={h.id}>
                    <Habit 
                        name={h.name} 
                        id={h.id}
                        frequency={h.frequency}
                        streak={h.streak}
                />
                </li>
            ))}
        </ul>
    );
}

export default HabitList;