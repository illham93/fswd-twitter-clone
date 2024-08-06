import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './home.scss';

const Home = props => (
  <div className='container'>
    <h1>Home page</h1>
    <form id="sign-up-form">
      <h5>Sign Up</h5>
      <input id='sign-up-username' placeholder="username" />
      <input id='sign-up-email' placeholder='email' />
      <input id='sign-up-password' placeholder="password" />
      <button type='submit'>Sign Up</button>
    </form>
    <form id="log-in-form">
      <h5>Log In</h5>
      <input id='log-in-username' placeholder="username" />
      <input id='log-in-password' placeholder="password" />
      <button type='submit'>Log in</button>
    </form>
  </div>

)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )

  $.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $('#sign-up-form').on('submit', function(event) {
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
  });

  $('#log-in-form').on('submit', function(event) {
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
        } else {
          alert('Invalid username or password');
        }
      },
      error: function(error) {
        console.log('Request failed: ', error);
      }
    };
    $.ajax(request);
  });
});
