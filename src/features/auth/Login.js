import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, getAllUsers, loginUser} from "./authSlice";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const users = useSelector(getAllUsers);
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <>
            <div className="card mx-auto" style={{width: "30rem"}}>
                <div className="card-body">
                    <form>
                        <fieldset>
                            <legend>Welcome to Would You Rather App!</legend>
                            <div className="mb-3">
                                <label htmlFor="sign-in" className="form-label">Sign in</label>
                                <select id="sign-in" className="form-select" onChange={e => {
                                    setSelectedUserId(e.target.value);
                                }}>
                                    <option>Select User</option>
                                    {users && Object.values(users).map(user => <option key={user.id}
                                                                                       value={user.id}>{user.name}</option>)}
                                </select>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-success" onClick={e => {
                                    e.preventDefault();
                                    if (!selectedUserId) {
                                        toast.error('Please select a user.');
                                        return;
                                    }
                                    dispatch(loginUser(users[selectedUserId]));
                                }}>Submit
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
