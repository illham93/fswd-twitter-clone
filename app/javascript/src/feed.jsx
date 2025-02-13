import React from "react";
import { handleErrors, safeCredentials } from "./utils/fetchHelper";

class Feed extends React.Component {

    state = {
        tweets: [],
    }

    componentDidMount() {
        fetch('/api/tweets', safeCredentials({
            method: 'GET',
        }))
        .then(handleErrors)
        .then(response => {
            if (response.success) {
                this.setState({
                    tweets: response.tweets,
                })
                console.log('Tweets retrieved');
            } else {
                alert('Error: could not fetch Tweets');
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            alert('Request failed. Check the console for more details.');
        })
    }

    render () {
        const {tweets} = this.state;
        return (
            <div className="container">
                <h3 className="text-center">Your feed</h3>
                <ul>
                    {tweets.map(tweet => (
                        <li key={tweet.id}>
                            <p><strong>User:</strong> {tweet.user.username}</p>
                            <p><strong>Message:</strong> {tweet.message}</p>
                        </li>
                    ))}
                </ul>
            </div>  
        )
    }

}

export default Feed;