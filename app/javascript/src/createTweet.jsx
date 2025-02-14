import React from "react";
import { safeCredentialsFormData, handleErrors } from "./utils/fetchHelper";

class CreateTweet extends React.Component {

    handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        fetch(`/api/tweets`, safeCredentialsFormData({
            method: 'POST',
            body: formData
        }))
        .then(handleErrors)
        .then(response => {
            if (response.success) {
                alert('Tweet created');
                window.location.reload();
            } else {
                alert('Error: ' + response.errors.join(', '));
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            alert('Request failed. Check the console for more details.');
        });
    };

    render() {
        return (
            <div className="container">
                <h3 className="text-center">Create Tweet</h3>
                <form id="create-tweet" onSubmit={this.handleSubmit}>
                    <label htmlFor="message">Message:</label>
                    <textarea className="form-control" name="message" required />
                    <button className="btn btn-primary mt-2" type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export default CreateTweet;
