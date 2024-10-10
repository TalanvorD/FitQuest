const UserBodyFat = ({
    user,
    title,
    showTitle = true,
  }) => {
    if (!user.bodyFatTrack[0]) {
      return <h3>No body fat records!</h3>;
    }

    return (
      <div>
        {showTitle && <h3 id="userinfo-stats">{title}</h3>}
        {user &&
          user.bodyFatTrack.map((bodyFatTrack) => (
            <div key={bodyFatTrack.recordedAt} className="card mb-3">
              <div className="card-body bg-light p-2">
                <p className="center text-light p-3 mb-5">Body fat recorded: {bodyFatTrack.recordedBodyFat}%
                Measured on: {bodyFatTrack.recordedAt}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };
  
  export default UserBodyFat;
  