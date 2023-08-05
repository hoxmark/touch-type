// src/components/TypingExercise.js
import React, { useEffect, useState } from "react";
import '../css/TypingExcercise.css';
import useWPM from '../hooks/useWPM'; // Import the custom hook

function TypingExercise() {
    const [exercises, setExercises] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        // Check if the task is completed and stop the timer if it is.
        if (isCompleted) {
            stopTimer();  // Assuming you have this function in your useWPM hook
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



    const highlightCharDifferences = (content, input) => {
        const contentChars = content.split('');
        const inputChars = input.split('');

        return contentChars.map((char, index) => {
            if (inputChars[index] === char) {
                return <span key={index} style={{ color: 'green' }}>{char}</span>;
            } else if (inputChars[index]) {
                return <span key={index} style={{ color: 'red', textDecoration: 'underline' }}>{inputChars[index]}</span>;
            } else {
                return <span key={index}>{char}</span>;
            }
        });
    };


    return (
        <div>
            <section className="exercise-section">

                {exercises.map(exercise => (
                    <div className="exercise-container" key={exercise.id}>
                        <header className="exercise-header">
                            <h2>{exercise.title}</h2>
                            <p>Time elapsed: {elapsedTime} seconds</p>
                            <p>WPM: {WPM}</p>
                        </header>

                        <div className="exercise-content">
                            <div className="text-display">
                                {highlightCharDifferences(exercise.content, userInput)}
                            </div>

                            {!isCompleted && <p className="next-character">Next character: <span>{exercise.content[userInput.length] || 'End'}</span></p>}
                            {!isCompleted && <textarea
                                rows="5"
                                placeholder="Start typing here..."
                                value={userInput}
                                onChange={e => {
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
                            />}

                            {isCompleted && <footer className="exercise-footer">Congratulations on completing the exercise!</footer>}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );

}

export default TypingExercise;
