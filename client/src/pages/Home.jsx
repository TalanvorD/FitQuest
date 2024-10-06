import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "../assets/css/profile.css"
import XpBar from '../components/XpBar/xpBar';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const Home = () => {
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
    <main id="main">
      <div id="main-content">
        <div id="main-content-1">
          <div id="character">
            <h2 className="card-title">{user.username}</h2>
          </div>
          <div id="character-statbox">
            <div>
              <h2 className="card-title stats-card">STATS</h2>
            </div>
            <div id="stats-info">
              <p className="stat-text vit-text">Vitality: {user.vitality}</p>
              <p className="stat-text str-text">Strength: {user.strength}</p>
              <p className="stat-text stam-text">Stamina: {user.stamina}</p>
              <p className="stat-text int-text">Intellect: {user.intellect}</p>
            </div>
          </div>
        </div>
        {/* <div className='main-xp'>
              <XpBar></XpBar>
        </div> */}
      </div>
      <img id="main-bg-img" src="../public/homepage-bg-2.webp"></img>
      <div id="main-img-border">
        <div id="active-quest-box" className="main-box-containers">
          <h2 id="active-quest-title" className="box-title">Active Quests</h2>
        </div>
        <div id="questboard-box" className="main-box-containers">
          <h2 id="questboard-title" className="box-title">Quest Board</h2>
        </div>
        <div id="leaderboard" className="main-box-containers">
          <h2 id="leaderboard-title" className="box-title">Leaderboard</h2>
        </div>
      </div>
      <div id="section1-div" className="flex-row justify-center">
      </div>

    </main>
  );
};

export default Home;
