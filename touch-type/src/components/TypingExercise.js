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

    const {
        startTime,
        elapsedTime,
        WPM,
        startTimer,
        stopTimer,
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

    useEffect(() => {
        // Calculate WPM whenever user input or elapsed time changes
        calculateWPM(userInput);
    }, [userInput, elapsedTime, calculateWPM]);

    useEffect(() => {
        // Stop the timer when the exercise is completed
        if (isCompleted) {
            stopTimer();
        }
    }, [isCompleted, stopTimer]);

    const handleRestartClick = () => {
        setUserInput('');
        setIsCompleted(false);
        startTimer();  // Restart the timer for a new attempt
    };

    const checkCompletion = (newValue) => {
        // Normalize both strings by trimming and converting to lowercase before comparison
        const isInputComplete = newValue.trim().length === exercise.tasks.trim().length;
        const isInputCorrect = newValue.trim().toLowerCase() === exercise.tasks.trim().toLowerCase();

        if (isInputComplete && !isInputCorrect) {
            // The user has finished typing, but there are errors
            return 'error'; // Return an error state
        } else if (isInputCorrect) {
            // The user has finished typing and there are no errors
            return 'complete';
        }
        return 'incomplete';
    };

    const handleInputChange = (e) => {
        let newValue = e.target.value;
        newValue = newValue.replace(/\n/g, '⏎'); // Replace new lines with '⏎' symbol
        setUserInput(newValue);

        // Start the timer on first input if it's not already started
        if (!startTime) {
            startTimer();
        }

        // Check if the task is complete and correct, or complete with errors
        const completionStatus = checkCompletion(newValue);
        if (completionStatus === 'complete') {
            setIsCompleted(true);
            stopTimer();
        } else if (completionStatus === 'error') {
            setIsCompleted(false); // User has finished typing but with errors
        } else {
            setIsCompleted(false); // User has not finished typing
        }

        calculateWPM(newValue); // Calculate WPM based on the current input
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
                            onInputChange={handleInputChange}
                        />
                        <div className="button-container">
                            <button id="restartButton" onClick={handleRestartClick}>Restart Exercise</button>
                        </div>
                        {isCompleted && (
                            <>
                                <ExerciseFooter />
                                <div className="completion-message">
                                    <p>Congratulations! You have completed the exercise.</p>
                                    <p><strong>Time Elapsed:</strong> {elapsedTime} seconds</p>
                                    <p><strong>Words Per Minute:</strong> {WPM}</p>
                                </div>
                            </>
                        )}
                        <h3 className="keyboard-header">Look at this keyboard, not your own</h3>
                        {/* Only pass targetKey if the exercise is not completed */}
                        {userInput.trim().length > exercise.tasks.trim().length && !isCompleted && (
                            <div className="error-message">
                                One or more characters are incorrect. Please check your input.
                            </div>
                        )}

                        <NorwegianMacKeyboard
                            targetKey={isCompleted ? 'DONE' : (exercise.tasks[userInput.length] || 'FAIL').toUpperCase()}
                        />
                    </div>
                )}
            </section>
        </div>
    );
}

export default TypingExercise;
