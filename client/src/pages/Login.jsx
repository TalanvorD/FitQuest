import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import '../index.css';
import '../App.css';

import Auth from '../utils/auth';


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  const goToSignup = () => {
  navigate('/signup');
  };

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      if (data && data.login) { 
        const currentPath = window.location.pathname; 
        Auth.login(data.login.token, currentPath); 
    }
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div id="login-bg">
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 id="login-btn" className="card-header bg-dark text-light p-2"></h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="login-form" onSubmit={handleFormSubmit}>
                <div className="login-btn-container">
                  <button className="login-page-buttons login-button">LOGIN</button>
                  <button className="login-page-buttons register-button" onClick={goToSignup}>REGISTER</button>
                </div>
                <img className="dragon-outline" src="/dragon-outline.webp"></img>
                <h2 id="login-title">Fit Quest</h2>
                <p id="email-text">Your Email</p>
                <input
                  id="login-email"
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <p id="password-text">Your Password</p>
                <input
                  id="login-password"
                  className="form-input"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary login-submit"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Login to your account
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    </div>
  );
};

export default Login;