import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, getAllUsers, getAuthedUser} from "../auth/authSlice";
import {getAllQuestions} from "./questionsSlice";


const QuestionResult = props => {
    const {question_id} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const questions = useSelector(getAllQuestions);
    const users = useSelector(getAllUsers);
    const authedUser = useSelector(getAuthedUser);
    const [question, setQuestion] = useState(null);
    const [optionOnePercentage, setOptionOnePercentage] = useState(0);
    const [optionTwoPercentage, setOptionTwoPercentage] = useState(0);
    const [optionOneVoteCount, setOptionOneVoteCount] = useState(0);
    const [optionTwoVoteCount, setOptionTwoVoteCount] = useState(0);
    const [totalVotesCount, setTotalVotesCount] = useState(0);

    useEffect(() => {
        setQuestion(questions ? questions[question_id] : null);
    }, [questions, question_id]);

    useEffect(() => {
        if (question) {
            setOptionOnePercentage(Math.round(question.optionOne.votes.length * 100 / (question.optionOne.votes.length + question.optionTwo.votes.length)));
            setOptionTwoPercentage(Math.round(question.optionTwo.votes.length * 100 / (question.optionOne.votes.length + question.optionTwo.votes.length)));
            setOptionOneVoteCount(question.optionOne.votes.length);
            setOptionTwoVoteCount(question.optionTwo.votes.length);
            setTotalVotesCount(question.optionOne.votes.length + question.optionTwo.votes.length);
        }
    }, [question]);

    return (
        <>
            {question &&
            <div className="card mx-auto" style={{width: "40rem"}}>
                <div className="card-body">
                    <div className="card-header">
                        <b>Asked by {users[question.author] && users[question.author].name}</b>
                    </div>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={users[question.author] && users[question.author].avatarURL} alt={users && users[question.author].name}/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Results:</h5>
                                <div className="card mb-2" style={{width: "24rem"}}>
                                    <div className="card-body">
                                        <p className="card-text">Would you rather {question.optionOne.text}</p>
                                        <div className="progress mb-1">
                                            <div className="progress-bar bg-success"
                                                 style={{width: `${optionOnePercentage}%`}}>{optionOnePercentage}%
                                            </div>
                                        </div>
                                        {question.optionOne.votes.includes(authedUser.id) &&
                                        <button className="btn btn-success">You Voted</button>}
                                        <p className="card-text"><small className="text-muted">{optionOneVoteCount} out
                                            of {totalVotesCount} votes</small></p>
                                    </div>
                                </div>
                                <div className="card" style={{width: "24rem"}}>
                                    <div className="card-body">
                                        <p className="card-text">Would you rather {question.optionTwo.text}</p>
                                        <div className="progress mb-1">
                                            <div className="progress-bar bg-success"
                                                 style={{width: `${optionTwoPercentage}%`}}>{optionTwoPercentage}%
                                            </div>
                                        </div>
                                        {question.optionTwo.votes.includes(authedUser.id) &&
                                        <button className="btn btn-success">You Voted</button>}
                                        <p className="card-text"><small
                                            className="text-muted">{optionTwoVoteCount} out {totalVotesCount} votes</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default QuestionResult;
