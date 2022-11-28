import { ActionTypes } from "../enums/ActionType";
import { Performance } from "../enums/Performance";

export interface QuestionState {
  questionCount: number;
  score: {
    scoreCount: number;
    performance: Performance;
    status: string;
  };
}

export interface Action {
  type: ActionTypes;
  payload: string;
}
