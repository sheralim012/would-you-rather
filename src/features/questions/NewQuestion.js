import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getAuthedUser} from "../auth/authSlice";
import {saveQuestion} from "./questionsSlice";

const NewQuestion = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const authedUser = useSelector(getAuthedUser);
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');

    return (
        <div className="card mx-auto" style={{width: "40rem"}}>
            <div className="card-header">
                <h3>Create New Question</h3>
            </div>
            <div className="card-body">
                <p>Complete the question:</p>
                <h4 className="card-title">Would you rather...</h4>
                <form>
                    <div className="mb-2">
                        <div className="form-group">
                            <input className="form-control"
                                   type="text"
                                   id="optionOne"
                                   placeholder="Enter Option Two Text Here"
                                   value={optionOne}
                                   onChange={e => {
                                       setOptionOne(e.target.value)
                                   }}/>
                        </div>
                    </div>
                    <h5>OR</h5>
                    <div className="mb-2">
                        <div className="form-group">
                            <input className="form-control"
                                   type="text"
                                   id="optionTwo"
                                   placeholder="Enter Option Two Text Here"
                                   value={optionTwo}
                                   onChange={e => {
                                       setOptionTwo(e.target.value)
                                   }}
                            />
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-success" onClick={e => {
                            e.preventDefault();
                            dispatch(saveQuestion({
                                optionOneText: optionOne,
                                optionTwoText: optionTwo,
                                author: authedUser.id,
                            }));
                            history.push('/');
                        }}>Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewQuestion;
