# Typing Exercise

This is a React component that provides a typing exercise for the user. It fetches an exercise from an API and displays it to the user. The user can then type the exercise and the component will calculate their typing speed in words per minute (WPM).

## Installation

To use this component, you need to have React installed in your project. You can then install the component using npm:

npm install typing-exercise


## Test it! 

you can access the website on vercel: 
https://touch-type-two.vercel.app/


## Why
I just wanted to play around with react again

# chatGPT 

```
Touch Typing Practice App Summary:

Backend: Django-based API to serve typing exercises.

Endpoint: /api/exercises/ to fetch a list of exercises.
Models: Exercise model with fields for content and possibly title.
Frontend: React application with the following main component:

TypingExercise: Fetches exercises from the backend, displays them, and allows users to type along. It highlights discrepancies between user input and the exercise content in real-time. There's a display of Words Per Minute (WPM), elapsed time, and immediate feedback on which character the user should type next.
Hooks: useWPM hook to calculate words per minute and elapsed time. It also contains functions to start and stop the timer.
UI Features:

Real-time difference highlighting: Correctly typed characters in green, discrepancies in red.
Display of next character to type.
WPM and elapsed time tracking.
A feedback mechanism when the exercise is completed.
Planned Enhancements: User profiles/authentication, progress tracking, exercise categories, and user feedback.
```

get project tree:
`tree -L 3 --gitignore`
