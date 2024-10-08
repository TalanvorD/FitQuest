import { useQuery, useMutation } from '@apollo/client';
import { SAVE_QUEST } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const QuestList = ({
    questList,
    title,
    userId,
    showTitle = true,
}) => {
    if (!questList) {
        return <h3>No quests available!</h3>;
    }

    const [saveQuest, { error }] = useMutation(SAVE_QUEST); // Importing a mutator function to add a quest to a users activeQuests list

    // Function that accepts the quest's mongo _id value as param and deletes the quest from the users activeQuest list
    const handleSaveQuest = async (questId, userId) => {
      try {
        const { data } = await saveQuest({  // Mutator function that attaches a quest by id from to a users activeQuests list
        variables: { questId, userId },
        refetchQueries:  [{ query: QUERY_ME }, 'me']}
      );
        if (data) { (`The quest has been saved.`); }
  
        if (error) { console.log("An error has occured while saving this quest!", error); }
      } catch (err) {
        console.error(err);
      }
    };

    return (
        <div>
            {showTitle && <h3 id="userinfo-stats">{title}</h3>}
            {questList && questList.quests.map((availableQuests) => (
                <div key={availableQuests._id} className="card mb-3">
                    <div key={availableQuests._id} className="card-body p-2">
                        <ul id="userinfo-stats">
                            <li>Title: {availableQuests.title}</li>
                            <li>Description: {availableQuests.description}</li>
                            <li>Stat Type: {availableQuests.statType}</li>
                            <li>XP Value: {availableQuests.expValue}</li>
                            <li>Time: {availableQuests.time}</li>
                        </ul>
                        <button onClick={() => handleSaveQuest(availableQuests._id, userId)}>Claim this quest!</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuestList;
