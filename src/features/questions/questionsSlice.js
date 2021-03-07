import {createSlice} from '@reduxjs/toolkit';
import * as API from "../../_DATA";

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        questions: [],
    },
    reducers: {
        questionsReceived: (state, action) => {
            state.questions = action.payload;
        },
    },
});

export const {questionsReceived} = questionsSlice.actions;

export const fetchQuestions = () => dispatch => {
    API._getQuestions()
        .then(questions => {
            dispatch(questionsReceived(questions));
        });
};

export const saveQuestion = data => dispatch => {
    API._saveQuestion(data)
        .then(question => {
            dispatch(fetchQuestions());
        });
};

export const saveAnswer = data => dispatch => {
    API._saveQuestionAnswer(data)
        .then(() => {
            dispatch(fetchQuestions());
        });
};

export const getAllQuestions = state => state.questions.questions;
export const getAnsweredQuestions = state => Object.values(state.questions.questions).filter(question =>
    question.optionOne.votes.includes(state.auth.authedUser.id) || question.optionTwo.votes.includes(state.auth.authedUser.id)).sort((x, y) => y.timestamp - x.timestamp);
export const getUnansweredQuestions = state => Object.values(state.questions.questions).filter(question =>
    !question.optionOne.votes.includes(state.auth.authedUser.id) && !question.optionTwo.votes.includes(state.auth.authedUser.id)).sort((x, y) => y.timestamp - x.timestamp);
export const getCreatedQuestions = state => Object.values(state.questions.questions).filter(question =>
    !question.author === state.auth.authedUser.id);

export default questionsSlice.reducer;
