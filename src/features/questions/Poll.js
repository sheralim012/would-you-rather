import React from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getAuthedUser} from "../auth/authSlice";
import QuestionResult from "./QuestionResult";
import Question from "./Question";


const Poll = () => {
    const {question_id} = useParams();
    const authedUser = useSelector(getAuthedUser);

    return (
        <>
            {Object.keys(authedUser.answers).includes(question_id) ? <QuestionResult question_id={question_id}/> : <Question question_id={question_id}/>}
        </>
    );
};

export default Poll;
