import {getAuthedUser, logoutUser} from "../auth/authSlice";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";

const Nav = () => {
    const history = useHistory();
    const authedUser = useSelector(getAuthedUser);
    const dispatch = useDispatch();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <Link to="/" className="navbar-brand">Would You Rather App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {authedUser &&
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/add" className="nav-link">New Question</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/leaderboard" className="nav-link">Leader Board</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <span className="mx-1">Hello, {authedUser.name}</span>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={e => {
                        e.preventDefault();
                        dispatch(logoutUser());
                        history.push('/');
                    }}>Logout
                    </button>
                </form>
            </div>
            }
        </nav>
    );
}

export default Nav;
