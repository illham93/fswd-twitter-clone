import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './home.scss';
import Feed from './feed';
import CreateTweet from './createTweet';
import Navbar from './navbar';
import { safeCredentials } from './utils/fetchHelper';

const Home = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [signUpData, setSignUpData] = useState({username: '', email: '', password: ''});
  const [logInData, setLogInData] = useState({username: '', password: ''});

  useEffect(() => {
    // Check if the user is authenticated
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) {
          setIsAuthenticated(true);
        }
      })
      .catch(error => {
        console.log('Request failed: ', error);
      });
  }, []);

  const handleSignUp = (event) => {
    event.preventDefault();

    fetch('/api/users', safeCredentials({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: signUpData}),
    }))
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('User successfully created');
        setIsAuthenticated(true);
      } else {
        console.log('Errors: ', data.errors.join(', '));
        alert(data.errors.join(', '));
      }
    })
    .catch(error => {
      console.log('Request failed: ', error);
    });
  };

  const handleLogIn = (event) => {
    event.preventDefault();

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: logInData}),
    }))
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('User successfully logged in');
        setIsAuthenticated(true);
      } else {
        alert('Invalid username or password');
      }
    })
    .catch(error => {
      console.log('Request failed: ', error);
    });
  };

  const handleChange = (event, setData) => {
    const {name, value} = event.target;
    setData(prevData => ({...prevData, [name]: value}));
  };

  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <CreateTweet />
        <Feed />
      </>
    );
  }

  return (
    <div className='container'>
      <h1 className='mt-3 text-center'>Twitter</h1>
      <form id="sign-up-form" onSubmit={handleSignUp}>
        <h5>Sign Up</h5>
        <input name='username' className='form-control mb-1' placeholder="username" value={signUpData.username} onChange={(e) => handleChange(e, setSignUpData)} />
        <input name='email' className='form-control mb-1' placeholder='email' value={signUpData.email} onChange={(e) => handleChange(e, setSignUpData)} />
        <input name='password' className='form-control mb-1' placeholder="password" value={signUpData.password} onChange={(e) => handleChange(e, setSignUpData)}/>
        <button className='btn btn-primary mb-3' type='submit'>Sign Up</button>
      </form>
      <form id="log-in-form" className='mb-3' onSubmit={handleLogIn}>
        <h5>Log In</h5>
        <input className='form-control mb-1' name='username' placeholder="username" value={logInData.username} onChange={(e) => handleChange(e, setLogInData)} />
        <input className='form-control mb-1' name='password' placeholder="password" value={logInData.password} onChange={(e) => handleChange(e, setLogInData)} />
        <button className='btn btn-primary' type='submit'>Log in</button>
      </form>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  );
});