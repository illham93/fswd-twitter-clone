import React from "react";
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class MyTweets extends React.Component {

    state = {
        tweets: [],
        id: '',
    }

    componentDidMount() {
        fetch('/api/authenticated', safeCredentials({
            method: 'GET',
        }))
        .then(handleErrors)
        .then(response => {
            if (response.authenticated) {
                console.log(response.user);
                const id = response.user.id;
                this.setState({id});

                fetch(`/api/users/${id}/tweets`, safeCredentials({
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

    delete = (id) => {
        if (confirm('Are you sure you want to delete this Tweet?')) {
            fetch(`/api/tweets/${id}`, safeCredentials({
                method: 'DELETE'
            }))
            .then(handleErrors)
            .then(response => {
                if (response.success) {
                    window.location.reload();
                } else {
                    alert('Error: could not delete Tweet');
                }
            })
            .catch(error => {
                console.error('Request failed:', error);
                alert('Request failed. Check the console for more details.');
            })
        }
    }

    render () {
        const {tweets} = this.state

        return (
            <div className="container">
                <h3 className="text-center">My Tweets</h3>
                <ul className="list-unstyled">
                    {tweets.map(tweet => (
                        <li key={tweet.id} className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded">
                            <p><strong>Message:</strong> {tweet.message}</p>
                            <button onClick={() => this.delete(tweet.id)} title="Delete" className="btn btn-sm btn-danger">X</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default MyTweets;