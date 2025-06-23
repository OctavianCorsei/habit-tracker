function Habit({name, id, frequency, streak, checkIns = [], onCheckIn}) {
    const today = new Date().toISOString().slice(0, 10);
    const alreadyCheckedIn = checkIns.includes(today);
    return (
        <div>
            <strong>{name}</strong> - {frequency} | 🔥 streak: {streak} 
            <button
                onClick={() => onCheckIn(id)}
                disabled={alreadyCheckedIn}
            >
                {alreadyCheckedIn ? "Done already" : "Mark as Done"}
            </button>
        </div>
    );
}

export default Habit;