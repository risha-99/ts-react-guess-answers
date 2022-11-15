import { useEffect, useState } from "react";

interface Time {
    minutes: number,
    seconds: number
}

export const Game = (props: any) => {
    const [operator, setOperator] = useState('');
    const [time, setTime] = useState<Time>({ minutes: 0, seconds: 5 });

    useEffect(() => {
        let generatedOperator = generateRandomOperator();
        setOperator(generatedOperator);
    }, [])

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

    const generateRandomOperator = () => {
        let randomNumber = Math.floor(Math.random() * props.operators.length)
        return props.operators[randomNumber];
    }

    return (<>
        <h1> {operator}</h1>
        <h3>{time.minutes} {time.seconds}</h3>
    </>)
}