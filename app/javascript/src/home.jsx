import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './home.scss';
import Feed from './feed';
import CreateTweet from './createTweet';
import Logout from './logout';

const Home = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    $.ajax({
      type: 'GET',
      url: '/api/authenticated',
      success: function(response) {
        if (response.authenticated) {
          setIsAuthenticated(true);
        }
      },
      error: function(error) {
        console.log('Request failed: ', error);
      }
    });
  }, []);

  const handleSignUp = (event) => {
    event.preventDefault();

    var username = $('#sign-up-username').val();
    var email = $('#sign-up-email').val();
    var password = $('#sign-up-password').val();
    var request = {
      type: 'POST',
      url: '/api/users',
      data: {
        user: {
          username: username,
          email: email,
          password: password
        }
      },
      success: function(response) {
        if (response.success) {
          console.log('user successfully added');
          setIsAuthenticated(true);
        } else {
          console.log('Errors:', response.errors.join(', '));
          alert(response.errors.join(', '));
        }
      },
      error: function(jqXHR) {
        if (jqXHR.status === 422) {
          var errors = jqXHR.responseJSON.errors;
          console.log('Errors:', errors.join('\n'));
          alert(errors.join(', '));
        } else {
          console.log('Request failed: ', jqXHR);
        }
      }
    };
    $.ajax(request);
  };

  const handleLogIn = (event) => {
    event.preventDefault();

    var username = $('#log-in-username').val();
    var password = $('#log-in-password').val();
    var request = {
      type: 'POST',
      url: '/api/sessions',
      data: {
        user: {
          username: username,
          password: password
        }
      },
      success: function(response) {
        if (response.success) {
          console.log('user successfully logged in');
          setIsAuthenticated(true);
        } else {
          alert('Invalid username or password');
        }
      },
      error: function(error) {
        console.log('Request failed: ', error);
      }
    };
    $.ajax(request);
  };

  if (isAuthenticated) {
    return (
      <>
        <Logout />
        <CreateTweet />
        <Feed />
      </>
    );
  }

  return (
    <div className='container'>
      <h1 className='mt-3 text-center'>Home</h1>
      <form id="sign-up-form" onSubmit={handleSignUp}>
        <h5>Sign Up</h5>
        <input id='sign-up-username' className='form-control mb-1' placeholder="username" />
        <input id='sign-up-email' className='form-control mb-1' placeholder='email' />
        <input id='sign-up-password' className='form-control mb-1' placeholder="password" />
        <button className='btn btn-primary mb-3' type='submit'>Sign Up</button>
      </form>
      <form id="log-in-form" className='mb-3' onSubmit={handleLogIn}>
        <h5>Log In</h5>
        <input className='form-control mb-1' id='log-in-username' placeholder="username" />
        <input className='form-control mb-1' id='log-in-password' placeholder="password" />
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

  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
});