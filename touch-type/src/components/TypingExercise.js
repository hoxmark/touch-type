// src/components/TypingExercise.js
import React, { useEffect, useState } from "react";
import '../css/TypingExcercise.css';
import useWPM from '../hooks/useWPM'; // Import the custom hook
import NorwegianMacKeyboard from "./keyboards/NorwegianMacKeyboard";

import { useParams } from "react-router-dom";
import ExerciseContent from "./ExerciseContent";
import ExerciseFooter from "./ExerciseFooter";
import ExerciseHeader from "./ExerciseHeader";
import Header from './Header';

import chaptersData from '../assets/exercises.json'; // Updated import to reflect new data structure

function TypingExercise() {
    const [userInput, setUserInput] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [exercise, setExercise] = useState(null);
    const { exercise_id } = useParams();  // Access route parameters

    // useEffect(() => {
    //     // Check if the task is completed and stop the timer if it is.
    //     if (isCompleted) {
    //         stopTimer();
    //     }
    // }, [isCompleted]);

    const {
        startTime,
        elapsedTime,
        WPM,
        startTimer,
        // stopTimer,
        calculateWPM
    } = useWPM();  // Use the custom hook

    useEffect(() => {
        // Find the correct exercise by iterating over all chapters
        let foundExercise = null;
        for (let chapter of chaptersData.chapters) {
            foundExercise = chapter.exercises.find(ex => ex.exercise_id === exercise_id);
            if (foundExercise) break;
        }
        setExercise(foundExercise);
    }, [exercise_id]);

    const handleRestartClick = () => {
        setUserInput('');
        setIsCompleted(false);
        startTimer();  // Restart the timer for a new attempt
    };

    return (
        <div className="app">
            <Header />
            <section className="exercise-section">
                {exercise && (
                    <div className="exercise-container">
                        <ExerciseHeader
                            title={exercise.name}
                            elapsedTime={elapsedTime}
                            WPM={WPM}
                        />
                        <p className="exercise-description">{exercise.description}</p>
                        <ExerciseContent
                            content={exercise.tasks.toLowerCase()}
                            userInput={userInput}
                            isCompleted={isCompleted}
                            onInputChange={e => {
                                if (!userInput && !startTime) {
                                    startTimer();
                                }
                                let newValue = e.target.value;
                                newValue = newValue.replace(/\n/g, '⏎');
                                if (newValue === exercise.tasks) {
                                    setIsCompleted(true);
                                } else {
                                    setIsCompleted(false);
                                }
                                setUserInput(newValue);
                                calculateWPM(newValue);
                            }}
                        />
                        <div className="button-container">
                            <button id="restartButton" onClick={handleRestartClick}>Restart Exercise</button>
                        </div>
                        {isCompleted && <ExerciseFooter />}
                        <h3 className="keyboard-header">Look at this keyboard, not your own</h3>
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
