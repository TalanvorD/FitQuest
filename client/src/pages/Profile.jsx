import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "../assets/css/profile.css"
// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';
import XpBar from '../components/XpBar/xpBar';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import UserInfoForm from '../components/InfoForm/userInfoForm';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() && 
    /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  
  return (
    <div>
      <div className='center'>
        <div className="hero">
          {/* <img className="hero"/> */}
          <h2 className="center text-light p-3 mb-5">
            Welcome {user.username}
          </h2>
          <div className='grid'>
            <div className='profile-section'>
              <h3>{user.username}</h3>
              <ul>
              <li className="stat-text vit-text">Vitality: {user.vitality}</li>
              <li className="stat-text str-text">Strength: {user.strength}</li>
              <li className="stat-text stam-text">Stamina: {user.stamina}</li>
              <li className="stat-text int-text">Intellect: {user.intellect}</li>
              </ul>
              {/* user character image */}
              {/* user stats (weight height goal) */}
            </div>
            <div className='xp-section'>
              <XpBar xp={user.expPoints} level={user.level}></XpBar>
            </div>
            {/* current quest */}
            {/* a section to show trends in weight and maybe even activity */}
          </div>
          <UserInfoForm user={user} title={`Title for this`} showTitle={true}></UserInfoForm>

          {/* <div className="col-12 col-md-10 mb-5">
            <ThoughtList
              thoughts={user.thoughts}
              title={`${user.username}'s thoughts...`}
              showTitle={false}
              showUsername={false}
            />
          </div>
          {!userParam && (
            <div
              className="col-12 col-md-10 mb-3 p-3"
              style={{ border: '1px dotted #1a1a1a' }}
            >
              <ThoughtForm />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
