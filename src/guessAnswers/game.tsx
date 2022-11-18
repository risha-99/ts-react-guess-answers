import { useEffect, useState } from "react";
import '../styles/game.css';
import { shuffleArray } from "../utilities/array-shuffle";
import { Operation } from "./selectOperators";
interface Time {
    minutes: number,
    seconds: number
}

export const Game = (props: { operations: Operation[] }) => {
    const [operation, setOperation] = useState<Operation | null>(null);
    const [time, setTime] = useState<Time>({ minutes: 0, seconds: 5 });
    const [timeOut, setTimeOut] = useState<boolean>(false);
    const [firstNumber, setFirstNumber] = useState<number>(0);
    const [secondNumber, setSecondNumber] = useState<number>(0);
    const [options, setOptions] = useState<number[]>([]);

    useEffect(() => {
        const generatedOperation = generateRandomOperation();
        setOperation(generatedOperation);
        generateRandomNumbers();
    }, [])

    useEffect(() => {
        initOptions();
    }, [operation, firstNumber, secondNumber]);

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

    const generateRandomNumbers = () => {
        setFirstNumber(Math.floor(Math.random() * 10));
        setSecondNumber(Math.floor(Math.random() * 10));
    }
    const calculatedValue = (): number | undefined => {
        return operation?.operate(firstNumber, secondNumber);
    }

    const initOptions = (): void => {
        const result = calculatedValue();
        if (result) {
            setOptions(shuffleArray([Math.floor(Math.random() * 10), result]));
        }
    }
    const handleAnswer = () => {
        const generatedOperation = generateRandomOperation();
        setOperation(generatedOperation);
        generateRandomNumbers();
        setTime({ minutes: 0, seconds: 5 });
    }
    return (<>
        <div className="game-container">
            <div className="clock" > {time.minutes} : {time.seconds} <br />{timeOut && 'Time Out'}</div>
            <div className="number-container">
                <div className="number-box" > {firstNumber}</div>
                <span className="operator-style">{operation?.operatorSymbol}</span>
                <div className="number-box"> {secondNumber}</div>
            </div>
            <div className="result">
                {options.map((option, index) => (
                    <div className="" onClick={handleAnswer} key={index}>{option}</div>
                ))}
            </div>
        </div>
    </>)
}