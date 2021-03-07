import React, {Fragment, useEffect} from 'react';
import Login from "../auth/Login";
import {Route, Switch} from 'react-router-dom';
import Home from "../questions/Home";
import Poll from "../questions/Poll";
import NewQuestion from "../questions/NewQuestion";
import LeaderBoard from "../questions/LeaderBoard";
import NotFound from "./NotFound";
import {useDispatch, useSelector} from "react-redux";
import {getAuthedUser, loginUser} from "../auth/authSlice";

const Routes = () => {
    const authedUser = useSelector(getAuthedUser);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loginUser(JSON.parse(localStorage.getItem('authedUser'))));
    }, [dispatch]);

    return (
        <Switch>
            {
                authedUser ?
                    <>
                        <Route path='/' exact component={Home}/>
                        <Route path='/add' component={NewQuestion}/>
                        <Route path='/leaderboard' exact component={LeaderBoard}/>
                        <Route path="/questions/:question_id" component={Poll}/>
                    </> :
                    <Route path='/' exact component={Login}/>
            }
            <Route component={NotFound}/>
        </Switch>
    );
}

export default Routes;
