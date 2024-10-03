import React, { useState } from 'react';
import './xpbar.css'; // Import the CSS file

const XpBar = () => {
  const [totalXP, setTotalXP] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const xpNeededForLevel = 100; 

  const updateXpBar = () => {
      setTotalXP(prev => {
          const newTotal = prev + 10;
          const currentLevelXp = newTotal % xpNeededForLevel; 
          if (newTotal >= xpNeededForLevel * currentLevel) {
              setCurrentLevel(prev => prev + 1); 
          }

          return newTotal; 
      });
  };

  const currentLevelXp = totalXP % xpNeededForLevel; 
  const percentage = (currentLevelXp / xpNeededForLevel) * 100; 

  return (
      <div>
          <div className="xp-bar">
              <div className="xp-fill" style={{ width: `${percentage}%` }}></div>
          </div>
          <p>Level: {currentLevel}</p>
          <p>Total Experience: {totalXP}</p>
          <button onClick={updateXpBar}>Gain Experience</button>
      </div>
  );
};

export default XpBar;