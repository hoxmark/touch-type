// src/components/TypingExercise.js
import React, { useEffect, useState } from "react";
import '../css/TypingExcercise.css';
import useWPM from '../hooks/useWPM'; // Import the custom hook
import NorwegianMacKeyboard from "./keyboards/NorwegianMacKeyboard";

import { useNavigate, useParams } from "react-router-dom";
import ExerciseContent from "./ExerciseContent";
import ExerciseFooter from "./ExerciseFooter";
import ExerciseHeader from "./ExerciseHeader";



function TypingExercise() {
    const [userInput, setUserInput] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [exercise, setExercise] = useState(null);
    const { exercise_id } = useParams();  // Access route parameters
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        // Check if the task is completed and stop the timer if it is.
        if (isCompleted) {
            stopTimer();
        }
    }, [isCompleted]);

    const {
        startTime,
        elapsedTime,
        WPM,
        startTimer,
        stopTimer,
        calculateWPM
    } = useWPM();  // Use the custom hook

    useEffect(() => {
        fetch(`/api/exercise/${exercise_id}/`) // Use the exercise_id parameter in the API request
            .then(response => response.json())
            .then(data => setExercise(data));
    }, [exercise_id]); // Add exercise_id as a dependency

    const handleBackClick = () => {
        navigate('/select-exercise'); // Navigate back to exercise selector
    };

    const handleRestartClick = () => {
        setExercise(null); // Reset the exercise state (adjust this based on your state management)
        setUserInput(''); // Reset the text input state

        fetch(`/api/exercise/${exercise_id}/`) // Fetch the exercise data again
            .then(response => response.json())
            .then(data => setExercise(data));
    };


    return (
        <div>
            <section className="exercise-section">
                {exercise && (
                    <div className="exercise-container">
                        <ExerciseHeader
                            title={exercise.name}
                            elapsedTime={elapsedTime}
                            WPM={WPM}
                        />
                        {/* Display the Description Here */}
                        <p className="exercise-description">{exercise.description}</p>
                        <ExerciseContent
                            content={exercise.tasks.toLowerCase()} // Convert to lowercase, temporary while imported data is in uppercase
                            userInput={userInput}
                            isCompleted={isCompleted}
                            onInputChange={e => {
                                if (!userInput && !startTime) {
                                    startTimer();
                                }
                                if (e.target.value === exercise.tasks) {
                                    setIsCompleted(true);
                                } else {
                                    setIsCompleted(false);
                                }
                                setUserInput(e.target.value);
                                calculateWPM(e.target.value);
                            }}
                        />
                        <div>
                            <button onClick={handleBackClick}>Back to exercise list</button>
                            <button onClick={handleRestartClick}>Restart Exercise</button>
                        </div>
                        {isCompleted && <ExerciseFooter />}
                        <h3>Look at this keyboard, not your own</h3>
                        <NorwegianMacKeyboard
                            targetKey={(exercise.tasks[userInput.length] || '').toUpperCase()}
                        />
                    </div>
                )}
            </section>
        </div>
    );


}

export default TypingExercise;
