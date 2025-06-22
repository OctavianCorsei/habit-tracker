function Habit({name, id, frequency, streak}) {
    return (
        <div>
            <strong>{name}</strong> - {frequency} | 🔥 streak: {streak} | id: {id} and
        </div>
    );
}

export default Habit;