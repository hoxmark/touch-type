// src/components/TypingExercise.js
import React, { useEffect, useState } from "react";
import '../css/TypingExcercise.css';
import useWPM from '../hooks/useWPM'; // Import the custom hook
import NorwegianMacKeyboard from "./keyboards/NorwegianMacKeyboard";

import ExerciseContent from "./ExerciseContent";
import ExerciseFooter from "./ExerciseFooter";
import ExerciseHeader from "./ExerciseHeader";


function TypingExercise({ exercise_id }) {
    const [userInput, setUserInput] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [exercise, setExercise] = useState(null);


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
        fetch(`/api/exercise/${exercise_id}/`)
            .then(response => response.json())
            .then(data => setExercise(data));
    }, []);

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
