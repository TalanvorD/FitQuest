import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "../assets/css/profile.css"// import ThoughtList from '../components/ThoughtList';
import XpBar from '../components/XpBar/xpBar';
import UserQuests from '../components/UserQuests';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import UserInfoForm from '../components/InfoForm/userInfoForm';
import UserInfo from '../components/UserInfo';
import Header from '../components/Header';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  if (
    Auth.loggedIn() && 
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
    <div id="main-profile">
      <div className='center'>
        <div className="hero">
          {/* <img className="hero"/> */}
          <Header></Header>
          <h2 className="center text-light p-3 mb-5" id="profile-welcome">
            Welcome
          </h2>
          <h2 className="center text-light p-3 mb-5" id="profile-name">
            {user.username}
          </h2>
          <div className='grid'>
            <div className='profile-section'>
              <UserInfo
                user={user}
                title={`${user.username}'s stats:`}
                showTitle={true}
                showUsername={true}
              />
              {/* user character image */}
            </div>
            <div className='xp-section'>
              <XpBar xp={user.expPoints} level={user.level}></XpBar>
            </div>

            {/* current quest */}
            {/* a section to show trends in weight and maybe even activity */}
          </div>

        </div>         

        <div id="bottom-border"></div>
      </div>        
      <div className='general-form'>
            <UserInfoForm user={user} title={`General Info Form`} showTitle={true}></UserInfoForm>
      </div>
        
      <div>
        <UserQuests
            quests={user.activeQuests}
            title={`${user.username}'s quests:`}
            userId={user._id}
            showTitle={true}
            showUsername={true}>
          </UserQuests>
      </div>
    </div>
  );
};

export default Profile;
