import '../index.css';
import '../App.css';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "../assets/css/profile.css"// import ThoughtList from '../components/ThoughtList';
// import XpBar from '../components/XpBar/xpBar';
// import UserQuests from '../components/UserQuests';
// import QuesList from '../components/QuestList'
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import UserInfoForm from '../components/InfoForm/userInfoForm';
// import UserInfo from '../components/UserInfo';

import Auth from '../utils/auth';


const FormPage = () => {

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
    <main id="landing-main">   
      <img id="landing-page-bg" src="/homepage-bg-2.webp"></img>
      <div className='general-form'>
            <UserInfoForm user={user} title={`General Info Form`} showTitle={true}></UserInfoForm>
          </div>
    </main>
  );
}

export default FormPage;