const UserBodyFat = ({
    bodyfat,
    title,
    showTitle = true,
  }) => {
    if (!bodyfat.length) {
      return <h3>No body fat records!</h3>;
    }
  
    return (
      <div>
        {showTitle && <h3>{title}</h3>}
        {bodyfat &&
          bodyfat.map((bodyFatTrack) => (
            <div className="card mb-3">
              <div key={bodyFatTrack._id} className="card-body bg-light p-2">
                <p className="center text-light p-3 mb-5">Body fat recorded: {bodyFatTrack.recordedBodyFat} lbs</p>
                <p className="center text-light p-3 mb-5">Measured on: {bodyFatTrack.recordedAt}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };
  
  export default UserBodyFat;
  