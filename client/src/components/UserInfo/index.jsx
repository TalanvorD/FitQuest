const UserInfo = ({
  user,
  title,
  showTitle = true,
}) => {
  if (!user) {
    return <h3>No user to show!</h3>;
  }
  
  let weightCheck = false;
  let bodyfatCheck = false;
  let userBmi = false;


  if (user.weightTrack[0] && user.bodyFatTrack[0]) {
    weightCheck = user.weightTrack.slice(-1)[0].recordedWeight;
    bodyfatCheck = user.bodyFatTrack.slice(-1)[0].recordedBodyFat;
    const bmiCalc = ((weightCheck * 703) / user.height) / user.height;
    userBmi = bmiCalc.toFixed();
  };

    return (
      <div>
        {showTitle && <h3 id="userinfo-stats">{title}</h3>}
        <ul id="userinfo-stats">
          <li>Level: {user.level}</li>
          <li>XP: {user.expPoints}</li>
          <li>Goal: {user.mainGoal}</li>
          <li>Strength: {user.strength}</li>
          <li>Intellect: {user.intellect}</li>
          <li>Stamina: {user.stamina}</li>
          <li>Vitality: {user.vitality}</li>
          <li>Height: {user.height}</li>
          {weightCheck ? <li>Current Weight: {user.weightTrack.slice(-1)[0].recordedWeight}  lbs</li> : <li>No current record for weight</li>}
          {bodyfatCheck ? <li>Current Body Fat: {user.bodyFatTrack.slice(-1)[0].recordedBodyFat}%</li> : <li>No current record for body fat</li>}
          {userBmi ? <li>Your BMI: {userBmi}</li> : <li>No record for BMI</li>}
          {/* <li>Your BMI: {userBmi}</li> */}
        </ul>
      </div>
    );
};

export default UserInfo;
