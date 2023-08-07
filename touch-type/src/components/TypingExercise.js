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

import exercisesData from '../assets/exercises.json';


function TypingExercise() {
    const [userInput, setUserInput] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [exercise, setExercise] = useState(null);
    const { exercise_id } = useParams();  // Access route parameters

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
        // Use the Array find method to find the exercise with the correct id
        const foundExercise = exercisesData.exercises.find(ex => ex.exercise_id === exercise_id);
        // Set the found exercise to state
        setExercise(foundExercise);
    }, [exercise_id]);

    
    //useEffect(() => {
    //    fetch(`/api/exercise/${exercise_id}/`) // Use the exercise_id parameter in the API request
    //        .then(response => response.json())
    //        .then(data => setExercise(data));
    //}, [exercise_id]); // Add exercise_id as a dependency

    const handleRestartClick = () => {
        setUserInput(''); // Reset the text input state
        const foundExercise = exercisesData.exercises.find(ex => ex.exercise_id === exercise_id); // Find the exercise data again
        setExercise(foundExercise); // Reset the exercise state with the found exercise
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
                                let newValue = e.target.value;

                                // Replace newline character with return symbol
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
