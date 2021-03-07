import React from "react";
import {useHistory} from "react-router-dom";

const NotFound = () => {
    const history = useHistory();

    return (
        <div className="card mx-auto text-white bg-danger text-center" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">404 - Not Found</h5>
                <h6 className="card-subtitle mb-2">Oops!</h6>
                <p className="card-text">{['/add', '/leaderboard'].includes(history.location.pathname) ? "Please login to view the content." : "Not Found"}</p>
            </div>
        </div>
    );
}

export default NotFound;
