import { Performance } from "../enums/Performance";

export interface QuestionState {
  questionCount: number;
  score: {
    scoreCount: number;
    performance: Performance;
    status: string;
  };
}
export interface ActionType {
  type: "ADD_QUESTION";
  payload: string;
}
