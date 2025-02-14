import React from "react";
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class MyTweets extends React.Component {

    state = {
        tweets: [],
        username: '',
    }

    componentDidMount() {
        fetch('/api/authenticated', safeCredentials({
            method: 'GET',
        }))
        .then(handleErrors)
        .then(response => {
            if (response.authenticated) {
                const username = response.username;
                this.setState({username});

                fetch(`/api/users/${username}/tweets`, safeCredentials({
                    method: 'GET',
                }))
                .then(handleErrors)
                .then(response => {
                    if (response.success) {
                        this.setState({
                            tweets: response.tweets,
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
            } else {
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            alert('Request failed. Check the console for more details.');
        });
    }

    render () {
        const {tweets} = this.state

        return (
            <div className="container">
                <h3 className="text-center">My Tweets</h3>
                <ul>
                    {tweets.map(tweet => (
                        <li key={tweet.id}>
                            <p><strong>Message:</strong> {tweet.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default MyTweets;