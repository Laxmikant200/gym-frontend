import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import ExerciseTemplates from './ExerciseTemplates';

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });
  
  const [currentWorkout, setCurrentWorkout] = useState({
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorkout(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentWorkout.exercise || !currentWorkout.sets || !currentWorkout.reps || !currentWorkout.weight) {
      toast.error("Please fill in all fields");
      return;
    }

    const newWorkout = {
      ...currentWorkout,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };

    setWorkouts(prev => [...prev, newWorkout]);
    setCurrentWorkout({
      exercise: '',
      sets: '',
      reps: '',
      weight: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    toast.success("Workout logged successfully!");
  };

  const deleteWorkout = (id) => {
    setWorkouts(prev => prev.filter(workout => workout.id !== id));
    toast.info("Workout deleted");
  };

  const handleTemplateWorkout = (templateWorkout) => {
    setWorkouts(prev => [...prev, templateWorkout]);
  };

  // Group workouts by date
  const groupedWorkouts = workouts.reduce((groups, workout) => {
    const date = workout.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(workout);
    return groups;
  }, {});

  return (
    <section className="workout-tracker">
      <h1>WORKOUT TRACKER</h1>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Exercise</label>
              <input
                type="text"
                name="exercise"
                value={currentWorkout.exercise}
                onChange={handleInputChange}
                placeholder="e.g., Bench Press"
                required
              />
            </div>
            <div>
              <label>Sets</label>
              <input
                type="number"
                name="sets"
                value={currentWorkout.sets}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div>
              <label>Reps</label>
              <input
                type="number"
                name="reps"
                value={currentWorkout.reps}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={currentWorkout.weight}
                onChange={handleInputChange}
                min="0"
                step="0.5"
                required
              />
            </div>
            <div>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={currentWorkout.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Log Workout</button>
          </form>
        </div>

        <div className="wrapper workout-history">
          <h2>Workout History</h2>
          {Object.entries(groupedWorkouts)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
            .map(([date, dayWorkouts]) => (
              <div key={date} className="workout-day">
                <h3>{new Date(date).toLocaleDateString()}</h3>
                <div className="workout-list">
                  {dayWorkouts.map(workout => (
                    <div key={workout.id} className="workout-item">
                      <div className="workout-details">
                        <h4>{workout.exercise}</h4>
                        <p>Sets: {workout.sets} | Reps: {workout.reps} | Weight: {workout.weight}kg</p>
                      </div>
                      <button 
                        onClick={() => deleteWorkout(workout.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="templates-section">
        <ExerciseTemplates onLogWorkout={handleTemplateWorkout} />
      </div>
    </section>
  );
};

export default WorkoutTracker; 