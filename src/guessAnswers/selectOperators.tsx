import { BaseSyntheticEvent, useState } from 'react';
import '../styles/operators.css';
import { Game } from './game';

export interface Operation {
    name: string;
    operatorSymbol: OperatorSymbol;
    operate(a: number, b: number): number;
}

export type OperatorSymbol = '+' | '-' | '*' | '/';

const allOperations: Operation[] = [
    {
        name: 'Add',
        operatorSymbol: '+',
        operate: (a, b) => {
            return a + b;
        }
    },
    {
        name: 'Subtract',
        operatorSymbol: '-',
        operate: (a, b) => {
            return a - b;
        }
    },
    {
        name: 'Multiple',
        operatorSymbol: '*',
        operate: (a, b) => {
            return a * b;
        }
    },
    {
        name: 'Devide',
        operatorSymbol: '/',
        operate: (a, b) => {
            return a / b;
        }
    }
]

export const SelectOperators = () => {
    const [operations, setOperations] = useState<Operation[]>([]);
    const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

    const addOperation = (e: BaseSyntheticEvent, operatorSymbol: OperatorSymbol) => {

        setOperations((existingOperations) => {
            if (!existingOperations.find(operation => operation.operatorSymbol === operatorSymbol)) {
                const toAddOperation = allOperations.find(alloperation => alloperation.operatorSymbol === operatorSymbol);
                if (toAddOperation) {
                    e.target.style.backgroundColor = 'blue';
                    return [...existingOperations, toAddOperation];
                }
                return [...existingOperations];
            }
            return [...existingOperations];
        })
    }

    const startGame = () => {
        setHasStartedPlaying(true);
    }
    return (
        <>
            {!hasStartedPlaying &&
                <div>
                    <div className='operator-container'>
                        <div className='operator-list'>

                            <div className="operator " onClick={(e) => addOperation(e, '+')}>+
                            </div>
                            <div className="operator" onClick={(e) => addOperation(e, '-')}>-
                            </div>
                            <div className="operator" onClick={(e) => addOperation(e, '*')}>*
                            </div>
                            <div className="operator" onClick={(e) => addOperation(e, '/')}>/
                            </div>
                        </div>

                        <button className="start-game" onClick={() => startGame()}>Start Game</button>
                    </div>

                </div>
            }
            {hasStartedPlaying && <Game operations={operations} />}
        </>
    )
}