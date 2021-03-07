import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, getAllUsers, getAuthedUser} from "../auth/authSlice";
import {getAllQuestions, saveAnswer} from "./questionsSlice";


const Question = props => {
    const {question_id} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const questions = useSelector(getAllQuestions);
    const users = useSelector(getAllUsers);
    const authedUser = useSelector(getAuthedUser);
    const [question, setQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        setQuestion(questions ? questions[question_id] : null);
    }, [questions, question_id]);

    return (
        <>
            {question &&
            <div className="card mx-auto" style={{width: "40rem"}}>
                <div className="card-body">
                    <div className="card-header">
                        <b>{users[question.author] && users[question.author].name} asks:</b>
                    </div>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={users[question.author] && users[question.author].avatarURL} alt={users && users[question.author].name}/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Would you rather...</h5>
                                <div onChange={e => {
                                    setSelectedOption(e.target.value);
                                }}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="pollOptions"
                                               id="optionOne" value="optionOne"/>
                                        <label className="form-check-label" htmlFor="optionOne">
                                            {question.optionOne.text}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="pollOptions"
                                               id="optionTwo" value="optionTwo"/>
                                        <label className="form-check-label" htmlFor="optionTwo">
                                            {question.optionTwo.text}
                                        </label>
                                    </div>
                                </div>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-success" onClick={e => {
                                        e.preventDefault();
                                        dispatch(saveAnswer({
                                            authedUser: authedUser.id,
                                            qid: question.id,
                                            answer: selectedOption
                                        }))
                                    }}>Submit
                                    </button>
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

export default Question;
