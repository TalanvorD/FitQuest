import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_QUEST } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
// import Auth from '../../utils/auth';
import '../../index.css';

const UserQuests = ({
    quests,
    userId,
    user,
    title,
    showTitle = true,
}) => {
    if (!quests.length) {
        return <h3>Not currently on any quests!</h3>;
    }

    const [removeQuest, { error }] = useMutation(REMOVE_QUEST); // Importing a mutator function to remove a quest
   //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

    // Function that accepts the quest's mongo _id value as param and deletes the quest from the users activeQuest list
    const handleRemoveQuest = async (questId, userId) => {
      try {
        const { data } = await removeQuest({  // Mutator function that removes a quest by id from a users activeQuest list
            variables: { questId, userId },
            refetchQueries:  [{ query: QUERY_ME }, 'me']}
          );
        if (data) { console.log(`The quest has been removed.`); }
  
        if (error) { console.log("An error has occured while removing this quest!", error); }
      } catch (err) {
        console.error(err);
      }
    };

    return (
        <div id="quest-main-content-div">
            {showTitle && <h3 id="userinfo-stats">{title}</h3>}
            {quests && quests.map((activeQuests) => (
                <div key={activeQuests._id} className="card mb-3" id="quest-list-box"> 
                    <div className="card-body bg-light p-2">
                        <ul id="userinfo-stats">
                            <li>Title: {activeQuests.title}</li>
                            <li>Description: {activeQuests.description}</li>
                            <li>Stat Type: {activeQuests.statType}</li>
                            <li>XP Value: {activeQuests.expValue}</li>
                            <li>Time: {activeQuests.time}</li>
                        </ul>
                        <div id="claim-button">
                        <button onClick={() => handleRemoveQuest(activeQuests._id, userId)}>Finish this quest!</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserQuests;
