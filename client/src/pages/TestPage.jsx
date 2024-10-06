import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "../assets/css/profile.css"
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import UserWeight from '../components/UserWeight';
import UserBodyFat from '../components/UserBodyFat';
import UserInfo from '../components/UserInfo';

import Auth from '../utils/auth';

const TestPage = () => {
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
              {/* {user.username} stats: */}
            <UserInfo
                        user={user}
                        title={`${user.username}'s stats:`}
                        showTitle={true}
                        showUsername={true}
                    />
              {/* user character image */}
              {/* user stats (weight height goal) */}
            </div>
            {/* current quest */}
            {/* a section to show trends in weight and maybe even activity */}
          </div>
        </div>
        <div className="col-12 col-md-10 mb-5">
                <div className='profile-section'>
                    <UserWeight
                        weight={user.weightTrack}
                        title={`${user.username}'s weight history`}
                        showTitle={true}
                        showUsername={true}
                    />
                </div>
        </div>
        <div className="col-12 col-md-10 mb-5">
                <div className='grid'>
                <div className='profile-section'>
                    <UserBodyFat
                        bodyfat={user.bodyFatTrack}
                        title={`${user.username}'s body fat history`}
                        showTitle={true}
                        showUsername={true}
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
