export interface QuestionState {
  questionCount: number;
}
const initialState: QuestionState = {
  questionCount: 0,
};

interface ActionType {
  type: "ADD_QUESTION";
  payload: string;
}
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
