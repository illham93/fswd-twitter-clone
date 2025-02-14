import React from "react";
import { safeCredentials } from "./utils/fetchHelper";

class Navbar extends React.Component {

    logout = () => {
        fetch('/api/sessions', safeCredentials({
            method: 'DELETE'
        }))
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
            } else {
                alert('Error: Could not log out');
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            alert('Request failed. Check the console for more details.');
        });
    }

    render() {
        return (
            <>
                <button onClick={this.logout} type="button" className="mt-3 ms-3 btn-lg btn-outline-primary">Log out</button>
                <button onClick={this.myTweets} type="button" className="mt-3 ms-3 btn-lg btn-outline-primary">My Tweets</button>
            </>
        )
    }
}

export default Navbar;