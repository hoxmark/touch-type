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

    const handleInputChange = (e) => {
        const newValue = e.target.value.replace(/\n/g, '⏎').toLowerCase();

        // Start timer on first input change
        if (!userInput && !startTime) {
            startTimer();
        }

        setUserInput(newValue);

        // Check for task completion
        const taskCompleted = newValue.trim() === exercise.tasks.toLowerCase().trim();
        if (taskCompleted && !isCompleted) {
            setIsCompleted(true); // Set to completed
            stopTimer(); // Stop the timer as soon as the task is completed
        } else if (!taskCompleted && isCompleted) {
            setIsCompleted(false); // Reset to not completed if they erase their input to correct it
        }
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
