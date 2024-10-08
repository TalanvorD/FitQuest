import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import "../assets/css/profile.css"
import { QUERY_USER, QUERY_USERS, USERS_LEADERBOARD, QUERY_ME, QUERY_QUESTS } from '../utils/queries';
import UserWeight from '../components/UserWeight';
import UserBodyFat from '../components/UserBodyFat';
import UserInfo from '../components/UserInfo';
import UserQuests from '../components/UserQuests';
import QuestList from '../components/QuestList';
import Leaderboard from '../components/Leaderboard';

import Auth from '../utils/auth';
import { REMOVE_QUEST } from '../utils/mutations';

const TestPage = () => {
  const { username: userParam } = useParams();
  const { loading: questsLoading, data: allQuests } = useQuery(QUERY_QUESTS);
  const { loading: allUsersLoading, data: allUsers } = useQuery(USERS_LEADERBOARD);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // const [removeQuest, { error }] = useMutation(REMOVE_QUEST); // Importing a mutator function to delete a book from the DB

  // // Function that accepts the quest's mongo _id value as param and deletes the quest from the users activeQuest list
  // const handleRemoveQuest = async (questId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const { data } = await removeQuest({ variables: { questId } }); // Mutator function that deletes a book by id from a users library

  //     // upon success, remove book's id from localStorage
  //     //removeBookId(bookId);

  //     if (data) { console.log(`The quest has been removed.`); }

  //     if (error) { console.log("An error has occured while removed this quest!", error); }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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

  if (questsLoading) {
    return <div>Loading quests...</div>;
  }

  if (allUsersLoading) {
    return <div>Loading quests...</div>;
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
          <h2 className="center text-dark p-3 mb-5">
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
              <UserQuests
                quests={user.activeQuests}
                title={`${user.username}'s quests:`}
                userId={user._id}
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
              user={user}
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
                user={user}
                title={`${user.username}'s body fat history`}
                showTitle={true}
                showUsername={true}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-10 mb-5">
          <div className='grid'>
            <div className='profile-section'>
              <Leaderboard
                userList={allUsers}
                title={`Leaderboard:`}
                showTitle={true}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-10 mb-5">
          <div className='grid'>
            <div className='profile-section'>
              <QuestList
                questList={allQuests}
                title={`Available quests:`}
                userId={user._id}
                showTitle={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
