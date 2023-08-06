// src/components/ExerciseSelector.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function ExerciseSelector() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch('/api/exercises/')
            .then(response => response.json())
            .then(data => setExercises(data));
    }, []);

    return (
        <div className="app">
            <div className="header">
                <h2>Select an Exercise</h2>
            </div>
            <div className="card-container">
                {exercises.map(exercise => (
                    <div className="exercise-card" key={exercise.exercise_id}>
                        <h2>{exercise.name}</h2>
                        <p>{exercise.description}</p>
                        <Link to={`/typing-exercise/${exercise.exercise_id}`}>Start Exercise</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExerciseSelector;
