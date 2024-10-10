import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import "../assets/css/profile.css"
import XpBar from '../components/XpBar/xpBar';
import { QUERY_USER, QUERY_ME, USERS_LEADERBOARD, QUERY_QUESTS } from '../utils/queries';
import Auth from '../utils/auth';

// For leaderboard, questlist, activequests, users image
import Leaderboard from '../components/Leaderboard';
import QuestList from '../components/QuestList';
import UserQuests from '../components/UserQuests';
import Header from '../components/Header';
import UserImage from '../components/UserImage';



const Home = () => {
  const { username: userParam } = useParams();

  // Fetch user data
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // Fetch leaderboard and quests data
  const { loading: allUsersLoading, data: allUsers } = useQuery(USERS_LEADERBOARD);
  const { loading: questsLoading, data: allQuests } = useQuery(QUERY_QUESTS);

  // Handle loading states
  if (loading || allUsersLoading || questsLoading) {
    return <div>Loading...</div>;
  }

  const user = data?.me || data?.user || {};

  // Check authentication and redirect if necessary
  if (!Auth.loggedIn()) {
    return <Navigate to="/landingpage" />;
  }

  if (
    Auth.loggedIn() && 
    Auth.getProfile().authenticatedPerson.username === userParam
  ) {
    return <Navigate to="/me" />;
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
          <Header></Header>
        <div id="main-content-1">
          <div id="character">
            <h2 className="card-title">{user.username}</h2>
            <UserImage
                userGoal={user.mainGoal}
              />
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
      </div>
      <img id="main-bg-img" src="/homepage-bg-2.webp" alt="Background" />
      <div id="main-img-border">
        <div id="active-quest-box" className="main-box-containers">
          <h2 id="active-quest-title" className="box-title">Active Quests</h2>
          <UserQuests
                quests={user.activeQuests}
                title={`${user.username}'s quests:`}
                userId={user._id}
                showTitle={true}
                showUsername={true}
              />
        </div>
        <div id="questboard-box" className="main-box-containers">
          <h2 id="questboard-title" className="box-title">Quest Board</h2>
          <QuestList
                questList={allQuests}
                title={`Available quests:`}
                userId={user._id}
                showTitle={true}
              />
        </div>
        <div id="leaderboard" className="main-box-containers">
          <h2 id="leaderboard-title leaderboard-box" className="box-title">Leaderboard</h2>
          <Leaderboard
                userList={allUsers}
                title={`Leaderboard:`}
                showTitle={true}
              />
        </div>
      </div>
      <div id="section1-div" className="flex-row justify-center">
      </div>
    </main>
  );
};

export default Home;