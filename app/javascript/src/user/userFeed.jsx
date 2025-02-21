import React from "react";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class UserFeed extends React.Component {

    state = {
        tweets: [],
        username: ''
    }

    componentDidMount() {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);
        fetch(`/api/users/${id}/tweets`, safeCredentials({
            method: 'GET',
        }))
        .then(handleErrors)
        .then(response => {
            if (response.success) {
                console.log(response);
                this.setState({
                    tweets: response.tweets,
                    username: response.tweets[0].user.username,
                });
                console.log('Tweets: ', response.tweets);
            } else {
                alert('Error: could not fetch Tweets');
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            alert('Request failed. Check the console for more details.');
        });
    }

    render() {
        const {tweets, username} = this.state
        return (
            <div className="container">
                <h3 className="text-center">{username}'s Tweets</h3>
                <ul className="list-unstyled">
                    {tweets.map(tweet => (
                        <li key={tweet.id} className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded">
                            <p><strong>Message:</strong> {tweet.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default UserFeed;