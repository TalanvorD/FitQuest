import '../../index.css';

const Leaderboard = ({
    userList,
    title,
    showTitle = true,
  }) => {
    if (!userList.getUsers.length) {
      return <h3>No users to show!</h3>;
    }
    
    return (
      <div id="leader-official-box">
        {/* {showTitle && <h3>{title}</h3>} */}
        {userList && userList.getUsers.map((leaderboardList) => (
            <div key={leaderboardList._id} className="card mb-3" id="leaderboard-content">
              <div className="card-body bg-light p-2" id="leaderboard-txt-box">
                <p className="center text-light p-3 mb-5" id="leaderboard-txt">{leaderboardList.username}</p>
                <p id="leaderboard-txt-xp">Level: {leaderboardList.level}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };
  
  export default Leaderboard;