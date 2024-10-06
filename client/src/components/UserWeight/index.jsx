const UserWeight = ({
  weight,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!weight.length) {
    return <h3>No weight records!</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {weight &&
        weight.map((weightTrack) => (
          <div className="card mb-3">
            <div key={weightTrack._id} className="card-body bg-light p-2">
              <p className="center text-light p-3 mb-5">Weight Recorded: {weightTrack.recordedWeight} lbs</p>
              <p className="center text-light p-3 mb-5">Weighed on: {weightTrack.recordedAt}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserWeight;
