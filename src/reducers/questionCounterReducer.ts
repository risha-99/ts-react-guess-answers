import { ActionTypes } from "../enums/ActionType";
import { Performance } from "../enums/Performance";
import { Action, QuestionState } from "../interfaces/QuestionState";

const initialState: QuestionState = {
  questionCount: 0,
  score: {
    scoreCount: 0,
    performance: Performance["Below_Expectation"],
    status: "Online",
  },
};

export const questionCounterReducer = (
  state = initialState,
  action: Action
): QuestionState => {
  switch (action.type) {
    case ActionTypes.ADD_QUESTION: {
      return {
        ...state,
        questionCount: state.questionCount + 1,
      };
    }
    case ActionTypes.PERFORMANCE_STATUS: {
      let performance_type: Performance;
      if (state.questionCount < 10) {
        performance_type = Performance["Below_Expectation"];
      } else if (state.questionCount >= 10 && state.questionCount <= 20) {
        performance_type = Performance.Good;
      } else {
        performance_type = Performance.Excellent;
      }

      return {
        ...state,
        score: {
          ...state.score,
          performance: performance_type,
        },
      };
    }

    default:
      return state;
  }
};
