// src/components/ExerciseSelector.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import '../App.css';
import chaptersData from '../assets/exercises.json'; // Assuming the new JSON is named exercises.json but structured with "chapters"
import '../css/ExerciseSelector.css';

function ExerciseSelector({ welcome }) {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        setChapters(chaptersData.chapters);
    }, []);

    return (
        <div className="app">
            <div className="header">
                <h1>Select an Exercise</h1>
                <p>{welcome}</p> {/* Render the welcome text */}
            </div>
            {chapters.map(chapter => (
                <div key={chapter.chapter_id} className="chapter">
                    <h2 className="chapter-title">{chapter.name}</h2>
                    <p className="chapter-description">{chapter.description}</p>
                    <div className="card-container">
                        {chapter.exercises.map(exercise => (
                            <div className="exercise-card" key={exercise.exercise_id}>
                                <h3>{exercise.name}</h3>
                                <p>{exercise.description}</p>
                                <Link to={`/typing-exercise/${exercise.exercise_id}`}>Start Exercise</Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExerciseSelector;
