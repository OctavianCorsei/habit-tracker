function HabitForm({ habit, setHabit, frequency, setFrequency, onSubmit }) {
    const isValid = habit.trim() !== "" && frequency !== "";
    return (
        <form onSubmit={onSubmit}>
            <input
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                placeholder="Enter a habit" 
            />
            <br />
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="">-- Select Frequency --</option>
                <option value="Daily"   >Daily</option>
                <option value="Weekly"  >Weekly</option>
                <option value="Biweekly">Biweekly</option>
            </select>
            <br />
            <button type="submit" disabled={!isValid}>Add Habit</button>
        </form>
    );
}

export default HabitForm;