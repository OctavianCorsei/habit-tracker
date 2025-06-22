import Habit from "./Habit";

function HabitList({ habits }) {
    return (
        <ul>
            {habits.map((h) => (
                <li key={h.id}>
                    <Habit name={h.name} />
                </li>
            ))}
        </ul>
    );
}

export default HabitList;