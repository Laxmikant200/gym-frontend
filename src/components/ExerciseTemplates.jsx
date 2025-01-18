import React, { useState } from 'react';
import { toast } from "react-toastify";

const ExerciseTemplates = ({ onLogWorkout }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [restTime, setRestTime] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const templates = {
    chest: [
      { exercise: 'Bench Press', sets: '4', reps: '8-12', weight: '' },
      { exercise: 'Incline Dumbbell Press', sets: '3', reps: '10-12', weight: '' },
      { exercise: 'Chest Flyes', sets: '3', reps: '12-15', weight: '' },
      { exercise: 'Push-Ups', sets: '3', reps: '15-20', weight: '0' }
    ],
    back: [
      { exercise: 'Deadlift', sets: '4', reps: '6-8', weight: '' },
      { exercise: 'Pull-Ups', sets: '3', reps: '8-12', weight: '0' },
      { exercise: 'Barbell Rows', sets: '3', reps: '10-12', weight: '' },
      { exercise: 'Lat Pulldowns', sets: '3', reps: '12-15', weight: '' }
    ],
    legs: [
      { exercise: 'Squats', sets: '4', reps: '8-10', weight: '' },
      { exercise: 'Romanian Deadlifts', sets: '3', reps: '10-12', weight: '' },
      { exercise: 'Leg Press', sets: '3', reps: '12-15', weight: '' },
      { exercise: 'Calf Raises', sets: '4', reps: '15-20', weight: '' }
    ],
    shoulders: [
      { exercise: 'Military Press', sets: '4', reps: '8-10', weight: '' },
      { exercise: 'Lateral Raises', sets: '3', reps: '12-15', weight: '' },
      { exercise: 'Front Raises', sets: '3', reps: '12-15', weight: '' },
      { exercise: 'Face Pulls', sets: '3', reps: '15-20', weight: '' }
    ],
    arms: [
      { exercise: 'Barbell Curls', sets: '3', reps: '10-12', weight: '' },
      { exercise: 'Tricep Pushdowns', sets: '3', reps: '12-15', weight: '' },
      { exercise: 'Hammer Curls', sets: '3', reps: '12-15', weight: '' },
      { exercise: 'Skull Crushers', sets: '3', reps: '12-15', weight: '' }
    ],
    core: [
      { exercise: 'Planks', sets: '3', reps: '45-60s', weight: '0' },
      { exercise: 'Russian Twists', sets: '3', reps: '20', weight: '' },
      { exercise: 'Leg Raises', sets: '3', reps: '15-20', weight: '0' },
      { exercise: 'Cable Crunches', sets: '3', reps: '15-20', weight: '' }
    ]
  };

  React.useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      toast.success("Rest time completed!");
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(restTime);
    setIsTimerActive(true);
    toast.info("Rest timer started!");
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setTimeLeft(restTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTemplateSelect = (muscle, exercises) => {
    setSelectedTemplate({ muscle, exercises });
  };

  const logExercise = (exercise) => {
    const workoutToLog = {
      ...exercise,
      date: new Date().toISOString().split('T')[0],
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    onLogWorkout(workoutToLog);
    toast.success(`Logged ${exercise.exercise}`);
  };

  return (
    <div className="exercise-templates">
      <h2>Workout Templates</h2>
      
      {!selectedTemplate ? (
        <div className="template-grid">
          {Object.entries(templates).map(([muscle, exercises]) => (
            <div key={muscle} className="template-card">
              <h3>{muscle.charAt(0).toUpperCase() + muscle.slice(1)} Workout</h3>
              <div className="exercise-list">
                {exercises.map((exercise, index) => (
                  <div key={index} className="template-exercise">
                    <p>{exercise.exercise}</p>
                    <p className="template-details">
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                ))}
              </div>
              <button onClick={() => handleTemplateSelect(muscle, exercises)}>
                Start Workout
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="active-template">
          <div className="template-header">
            <h3>{selectedTemplate.muscle.charAt(0).toUpperCase() + selectedTemplate.muscle.slice(1)} Workout</h3>
            <button className="back-btn" onClick={() => setSelectedTemplate(null)}>
              ← Back to Templates
            </button>
          </div>

          <div className="rest-timer">
            <h4>Rest Timer</h4>
            <div className="timer-display">
              <div className="time-left">{formatTime(timeLeft)}</div>
              <select 
                value={restTime} 
                onChange={(e) => setRestTime(Number(e.target.value))}
                disabled={isTimerActive}
              >
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={90}>1.5 minutes</option>
                <option value={120}>2 minutes</option>
                <option value={180}>3 minutes</option>
              </select>
              {!isTimerActive ? (
                <button onClick={startTimer} className="start-timer">
                  Start Rest Timer
                </button>
              ) : (
                <button onClick={stopTimer} className="stop-timer">
                  Stop Timer
                </button>
              )}
            </div>
          </div>

          <div className="template-exercises">
            {selectedTemplate.exercises.map((exercise, index) => (
              <div key={index} className="template-exercise-card">
                <div className="exercise-info">
                  <h4>{exercise.exercise}</h4>
                  <p>{exercise.sets} sets × {exercise.reps} reps</p>
                </div>
                <div className="exercise-actions">
                  <button 
                    className="log-exercise"
                    onClick={() => logExercise(exercise)}
                  >
                    Log Exercise
                  </button>
                  <button 
                    className="start-timer-small"
                    onClick={startTimer}
                  >
                    Start Rest
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseTemplates; 