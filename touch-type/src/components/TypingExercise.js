// src/components/TypingExercise.js
import React, { useEffect, useState } from "react";
import '../css/TypingExcercise.css';
import useWPM from '../hooks/useWPM'; // Import the custom hook
import NorwegianMacKeyboard from "./keyboards/NorwegianMacKeyboard";

import ExerciseContent from "./ExerciseContent";
import ExerciseFooter from "./ExerciseFooter";
import ExerciseHeader from "./ExerciseHeader";


function TypingExercise() {
    const [exercises, setExercises] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

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
        fetch('/api/exercises/')
            .then(response => response.json())
            .then(data => setExercises(data));
    }, []);


    return (
        <div>
            <section className="exercise-section">
                {exercises.map(exercise => (
                    <div className="exercise-container" key={exercise.id}>
                        <ExerciseHeader
                            title={exercise.title}
                            elapsedTime={elapsedTime}
                            WPM={WPM}
                        />
                        <ExerciseContent
                            content={exercise.content}
                            userInput={userInput}
                            isCompleted={isCompleted}
                            onInputChange={e => {
                                if (!userInput && !startTime) {
                                    startTimer();
                                }
                                if (e.target.value === exercise.content) {
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
                            targetKey={(exercise.content[userInput.length] || '').toUpperCase()}
                        />
                    </div>
                ))}
            </section>
        </div>
    );

}

export default TypingExercise;
