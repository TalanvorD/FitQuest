const UserWeight = ({
  user,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!user.weightTrack[0]) {
    return <h3>No weight records!</h3>;
  }

  return (
    <div>
      {showTitle && <h3 id="userinfo-stats">{title}</h3>}
      {user &&
        user.weightTrack.map((userWeight) => (
          <div key={userWeight.recordedAt} className="card mb-3">
            <div className="card-body bg-light p-2">
              <p className="center text-light p-3 mb-5">Weight Recorded: {userWeight.recordedWeight} lbs
              Weighed on: {userWeight.recordedAt}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserWeight;
