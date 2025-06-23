import Habit from "./Habit";

function HabitList({ habits, onCheckIn }) {
    return (
        <ul>
            {habits.map((h) => (
                <li key={h.id}>
                    <Habit 
                        name={h.name} 
                        id={h.id}
                        frequency={h.frequency}
                        streak={h.streak}
                        checkIns={h.checkIns}
                        onCheckIn = {onCheckIn}
                />
                </li>
            ))}
        </ul>
    );
}

export default HabitList;