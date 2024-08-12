import React, { useEffect } from 'react';
import useDogdle from '../hooks/useDogdle';
import Grid from './Grid';
import Keypad from './Keypad';

export default function Dogdle({ solution }) {

    const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useDogdle(solution);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup])

    useEffect(() => {
        console.log(guesses, turn, isCorrect)
    }, [guesses, turn, isCorrect])

    return (
        <div>
            <div>Solution - {solution}</div>
            <Grid currentGuess={currentGuess} guesses= {guesses} turn= {turn}/>
            <Keypad />
        </div>
    )
}
