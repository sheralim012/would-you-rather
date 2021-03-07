import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../auth/authSlice";
import {fetchQuestions, getAnsweredQuestions, getUnansweredQuestions} from "./questionsSlice";
import {Link} from "react-router-dom";


const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);
    const users = useSelector(getAllUsers);
    const answeredQuestions = useSelector(getAnsweredQuestions);
    const unansweredQuestions = useSelector(getUnansweredQuestions);
    const [showAnsweredQuestions, setShowAnsweredQuestions] = useState(false);

    return (
        <>
            <div className="card mx-auto" style={{width: "40rem"}}>
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={e => {
                                e.preventDefault();
                                setShowAnsweredQuestions(false);
                            }}>Unanswered Questions</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={e => {
                                e.preventDefault();
                                setShowAnsweredQuestions(true);
                            }}>Answered Questions</a>
                        </li>
                    </ul>
                </div>
                {unansweredQuestions && answeredQuestions &&
                Object.values(showAnsweredQuestions ? answeredQuestions : unansweredQuestions).map(question =>
                    <div className="card-body" key={question.id}>
                        <div className="card-header">
                            <b>{users && users[question.author].name} asks:</b>
                        </div>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={users && users[question.author].avatarURL} alt={users && users[question.author].name}/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Would you rather</h5>
                                    <p className="card-text">...{question.optionOne.text.substring(0,15)}...</p>
                                    <div className="d-grid gap-2">
                                        <Link to={`questions/${question.id}`} className="btn btn-outline-success">View Poll</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    );
};

export default Home;
