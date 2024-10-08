const Leaderboard = ({
    userList,
    title,
    showTitle = true,
  }) => {
    if (!userList.getUsers.length) {
      return <h3>No users to show!</h3>;
    }
    
    return (
      <div>
        {showTitle && <h3>{title}</h3>}
        {userList && userList.getUsers.map((leaderboardList) => (
            <div key={leaderboardList._id} className="card mb-3">
              <div className="card-body bg-light p-2">
                <p className="center text-light p-3 mb-5">Username: {leaderboardList.username} Level: {leaderboardList.level}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };
  
  export default Leaderboard;