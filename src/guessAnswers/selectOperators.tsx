import { BaseSyntheticEvent, useState } from 'react';
import '../styles/operators.css';
import { Game } from './game';

export const SelectOperators = () => {
    const [operators, setOperators] = useState<string[]>([]);
    const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

    const addOperator = (e: BaseSyntheticEvent) => {
        let addOperator: string[] = [...operators];
        if (!addOperator.includes(e.target.innerHTML)) {
            addOperator.push(e.target.innerHTML);
            e.target.style.backgroundColor = 'blue';
        }
        setOperators(addOperator);
    }

    const startGame = () => {
        setHasStartedPlaying(true);
    }
    return (
        <>

            {!hasStartedPlaying &&
                <div>
                    <div className='operator-container'>
                        <div className="operator " onClick={(e) => addOperator(e)}>+
                        </div>
                        <div className="operator" onClick={(e) => addOperator(e)}>-
                        </div>
                        <div className="operator" onClick={(e) => addOperator(e)}>*
                        </div>
                        <div className="operator" onClick={(e) => addOperator(e)}>/
                        </div>
                    </div>
                    <div ><button onClick={() => startGame()}>Start Game</button></div>
                </div>
            }
            {hasStartedPlaying && <Game operators={operators} />}
        </>
    )
}