import { useState } from 'react';


const useDogdle = (solution) => {

    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // each array has 6 chances
    const [history, setHistory] = useState([]); // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false);


    // format a guess into and array of letter objs
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'}
        });

        // find any correct (green) letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
            }
        })

        // find yellow letters
        formattedGuess.forEach((l, i)=> {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        })

        return formattedGuess;
    }

    // add new guess to guesses state
    // updated isCorrect state
    // add one to turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setCurrentGuess('');
    }

    // handle keyup event & track current guess
    // if user presses enter, add new guess
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            if (turn > 5) {
                console.log("You've used all of your guesses!")
                return 
            }
            if (history.includes(currentGuess)) {
                console.log("You've already tried that word!")
                return
            }
            if (currentGuess.length !== 5) {
                console.log("Word must be 5 letters!")
                return
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1))
            return
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key)
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup, solution}

}

export default useDogdle;