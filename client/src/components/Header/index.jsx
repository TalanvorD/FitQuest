import Auth from '../../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
    Auth.logout();
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const goToTest = () => {
    navigate('/testpage');
  };

  // const logout = () => {
  //   Auth.logout(); // Assuming this function handles the logout process
  //   navigate('/login'); // Redirect to the login page
  // };

  return (
    <header id="header-bg" className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div id="header-content" className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0" id="header-font">Fit Quest</h1>
          </Link>
        </div>
        <div id="header-right-content">
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2 header-links" to="/me" id="profile-link-header">
                <p>Your Profile</p>
              </Link>
              <button className="btn btn-lg btn-light m-2 header-links-button" onClick={goToTest}>
                Test Page
              </button>
              <button className="btn btn-lg btn-light m-2 header-links-button" onClick={goToLogin}>
                Logout
              </button>
            </>
          ) : (
            <>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
