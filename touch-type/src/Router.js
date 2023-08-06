// src/Router.js
import React from 'react';
// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ExerciseSelector from './components/ExerciseSelector';
import TypingExercise from './components/TypingExercise';

function NoMatch() {
    return (
        <div style={{ padding: 20 }}>
            <h2>404: Page Not Found</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
        </div>
    );
}


function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/select-exercise" element={<ExerciseSelector />} />
                <Route path="/typing-exercise/:exercise_id" element={<TypingExercise />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;