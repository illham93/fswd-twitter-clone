import React from "react";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class UserFeed extends React.Component {

    state = {
        tweets: [],
    }

    componentDidMount() {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);
        fetch(`/api/user/${id}/tweets`)
    }

    render() {
        return (
            <div className="container">
                <h3>User Feed</h3>
            </div>
        )
    }
}

export default UserFeed;