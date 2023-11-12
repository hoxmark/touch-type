// src/hooks/useWPM.js
import { useEffect, useRef, useState } from 'react';

function useWPM(exerciseText) {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [WPM, setWPM] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (startTime) {
            intervalRef.current = setInterval(() => {
                const now = new Date().getTime();
                const timeElapsed = (now - startTime) / 1000;
                setElapsedTime(timeElapsed);
            }, 1000);
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [startTime]);

    const startTimer = () => {
        if (!startTime) { // prevent restarting if already started
            setStartTime(new Date().getTime());
        }
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    const calculateWPM = (input) => {
        const words = input.trim().split(/\s+/).length; // Split by any whitespace, not just space
        const minutes = elapsedTime / 60;
        if (elapsedTime > 0) { // Prevent division by zero
            setWPM(((words / minutes) || 0).toFixed(2));
        }
    };

    // Reset function to clear the state
    const reset = () => {
        stopTimer();
        setStartTime(null);
        setElapsedTime(0);
        setWPM(0);
    };

    return {
        startTime,
        elapsedTime,
        WPM,
        startTimer,
        stopTimer,
        calculateWPM,
        reset
    };
}

export default useWPM;
