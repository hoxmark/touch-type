// src/components/ExerciseHeader.js
import React from "react";

function ExerciseHeader({ title, elapsedTime, WPM }) {
    return (
        <header className="exercise-header">
            <h1>{title}</h1>
            <p>Time elapsed: {elapsedTime} seconds</p>
            <p>WPM: {WPM}</p>
        </header>
    );
}

export default ExerciseHeader;
