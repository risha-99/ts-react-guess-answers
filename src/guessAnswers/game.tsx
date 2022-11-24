import { useEffect, useState } from "react";
import '../styles/game.css';
import { shuffleArray } from "../utilities/array-shuffle";
import { Operation } from "./selectOperators";
interface Time {
    minutes: number,
    seconds: number
}
interface RandomNumbers {
    firstNumber: number,
    secondNumber: number
}

enum GameState {
    PLAYING,
    OVER
}
export const Game = (props: { operations: Operation[] }) => {
    const [operation, setOperation] = useState<Operation | null>(null);
    const [time, setTime] = useState<Time>({ minutes: 0, seconds: 5 });
    const [timeOut, setTimeOut] = useState<boolean>(false);
    const [randNum, setRandNum] = useState<RandomNumbers>({ firstNumber: 0, secondNumber: 0 });
    const [options, setOptions] = useState<number[]>([]);
    const [gameState, setGameState] = useState(GameState.PLAYING);

    useEffect(() => {
        initGame();
    }, [])

    const initGame = () => {
        const generatedOperation = generateRandomOperation();
        const generatedNumber = generateRandomNumbers();
        const options = getOptions(generatedNumber.firstNumber, generatedNumber.secondNumber, generatedOperation);
        setOperation(generatedOperation);
        setRandNum(generatedNumber);
        setOptions(options);
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if (time.seconds > 0) {
                setTime((prevTime) => ({
                    ...prevTime,
                    seconds: prevTime.seconds - 1,
                }))
            }
            if (time.seconds === 0) {
                if (time.minutes === 0) {
                    setTimeOut(true);
                    clearInterval(interval)
                } else {
                    setTime(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
        return () => {
            clearInterval(interval);
        }
    });

    const generateRandomOperation = (): Operation => {
        let randomOperation = Math.floor(Math.random() * props.operations.length)
        return props.operations[randomOperation];
    }

    const generateRandomNumbers = (): RandomNumbers => {
        return {
            firstNumber: Math.floor(Math.random() * 10),
            secondNumber: Math.floor(Math.random() * 10)
        }
    }
    const getCorrectAnswer = (operation: Operation, firstNumber: number, secondNumber: number): number => {
        return operation.operate(firstNumber, secondNumber);
    }

    const getOptions = (firstNumber: number, secondNumber: number, operation: Operation): number[] => {
        const result = getCorrectAnswer(operation, firstNumber, secondNumber);
        return shuffleArray([Math.floor(Math.random() * 10), result])
    }
    const handleAnswer = (option: number) => {
        if (gameState !== GameState.OVER && option === getCorrectAnswer(operation!, randNum.firstNumber, randNum.secondNumber)) {
            setTime({ minutes: 0, seconds: 5 });
            initGame();
        } else {
            setTime({ minutes: 0, seconds: 0 });
            setGameState(GameState.OVER);
        }
    }
    return (<>
        <div className="game-container">
            <div className="clock" > {time.minutes} : {time.seconds} <br />{timeOut && 'Time Out'}</div>
            <div className="number-container">
                <div className="number-box" > {randNum.firstNumber}</div>
                <span className="operator-style">{operation?.operatorSymbol}</span>
                <div className="number-box"> {randNum.secondNumber}</div>
            </div>
            {gameState === GameState.OVER ? <h1>Game Over</h1> : ''}
            <div className="result">
                {options.map((option, index) => (
                    <div className="" onClick={() => handleAnswer(option)} key={index}>{option}</div>
                ))}
            </div>
        </div>
    </>)
}