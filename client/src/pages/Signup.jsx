import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      if (data && data.addUser) {
        const currentPath = window.location.pathname;
        Auth.login(data.addUser.token, currentPath);
      }
    } catch (e) {
      console.error(e);
    }
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
                    <button id="signup-log-btn" className="login-page-buttons login-button" onClick={goToLogin}>LOGIN</button>
                    <button id="signup-reg-btn" className="login-page-buttons register-button">REGISTER</button>
                  </div>
                  <h2 id="login-title">Fit Quest</h2>
                  <p id="signup-user-txt">Enter Username</p>
                  <input
                    id="signup-username"
                    className="form-input"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                  />
                  <p id="signup-email-txt">Enter Email</p>
                  <input
                    id="signup-email"
                    className="form-input"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <p id="signup-pass-txt">Enter Password</p>
                  <input
                    id="signup-password"
                    className="form-input"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    id="login-submit"
                    className="btn btn-block btn-primary login-submit"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
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

export default Signup;
