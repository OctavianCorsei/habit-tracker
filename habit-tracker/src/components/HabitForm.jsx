function HabitForm({ habit, setHabit, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <input
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                placeholder="Enter a habit" 
            />
            <br />
            <button type="submit">Add Habit</button>
        </form>
    );
}

export default HabitForm;