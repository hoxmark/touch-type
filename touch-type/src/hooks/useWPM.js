import { useEffect, useRef, useState } from 'react';

function useWPM() {
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [WPM, setWPM] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (startTime) {
            intervalRef.current = setInterval(() => {
                const now = new Date().getTime();
                const timeElapsed = Math.round((now - startTime) / 1000);
                setElapsedTime(timeElapsed);
            }, 1000);
        }

        return () => {
            clearInterval(intervalRef.current);
        }
    }, [startTime]);

    const startTimer = () => {
        setStartTime(new Date().getTime());
    };

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const calculateWPM = (input) => {
        const words = input.split(" ").length;
        const minutes = elapsedTime / 60;
        setWPM(Math.round(words / minutes));
    };

    return {
        startTime,
        elapsedTime,
        WPM,
        startTimer,
        stopTimer,
        calculateWPM
    };
}

export default useWPM;
