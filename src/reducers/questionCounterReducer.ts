import { Performance } from "../enums/Performance";
import { ActionType, QuestionState } from "../interfaces/QuestionState";

const initialState: QuestionState = {
  questionCount: 0,
  score: {
    scoreCount: 0,
    performance: Performance["Below Expectation"],
    status: "Online",
  },
};

export const questionCounterReducer = ( state = initialState, action: ActionType): QuestionState => {
  switch (action.type) {
    case "ADD_QUESTION": {
      return {
        ...state,
        questionCount: state.questionCount + 1,
      };
    }
    default:
      return state;
  }
};
