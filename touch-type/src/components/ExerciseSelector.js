// src/components/ExerciseSelector.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ExerciseSelector() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch('/api/exercises/') // Endpoint to fetch all exercises
            .then(response => response.json())
            .then(data => setExercises(data));
    }, []);

    return (
        <div>
            <h2>Select an Exercise</h2>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise.exercise_id}>
                        <Link to={`/typing-exercise/${exercise.exercise_id}`}>
                            {exercise.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExerciseSelector;
