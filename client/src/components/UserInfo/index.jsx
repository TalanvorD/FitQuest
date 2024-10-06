const UserInfo = ({
    user,
    title,
    showTitle = true,
    showUsername = true,
  }) => {
    if (!user) {
      return <h3>No user to show!</h3>;
    }
  
    return (
      <div>
        {showTitle && <h3>{title}</h3>}
        <ul>
              <li>Level: {user.level}</li>
              <li>XP: {user.expPoints}</li>
              <li>Goal: {user.mainGoal}</li>
              <li>Strength: {user.strength}</li>
              <li>Intellect: {user.intellect}</li>
              <li>Stamina: {user.stamina}</li>
              <li>Vitality: {user.vitality}</li>
              <li>Height: {user.height}</li>
              <li>Current Weight: {user.weightTrack.slice(-1)[0].recordedWeight} lbs</li>
              <li>Current Body Fat: {user.bodyFatTrack.slice(-1)[0].recordedBodyFat}%</li>
            </ul>
      </div>
    );
  };
  
  export default UserInfo;
  