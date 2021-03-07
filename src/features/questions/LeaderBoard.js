import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, getAllUsers} from "../auth/authSlice";

const LeaderBoard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const users = useSelector(getAllUsers);

    return (
        <>
            {users && Object.values(users).sort((x, y) => (Object.keys(y.answers).length + y.questions.length) - (Object.keys(x.answers).length + x.questions.length)).map((user, index) => (
                <div className="card mx-auto mb-2" style={{width: "40rem"}} key={index}>
                    <div className="card-body">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={user.avatarURL} alt={user.name}/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <div className="card mb-2" style={{width: "24rem"}}>
                                        <div className="card-body">
                                            <p className="card-text">Answered
                                                Questions: {Object.keys(user.answers).length}</p>
                                            <p className="card-text">Created Questions: {user.questions.length}</p>
                                            <p className="card-text">Score: {Object.keys(user.answers).length + user.questions.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default LeaderBoard;
