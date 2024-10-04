import React, { useState, useEffect } from 'react';
import './xpbar.css'; // Import the CSS file

const XpBar = () => {
  const [totalXP, setTotalXP] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const xpNeededForLevel = 100; 

  // Load user data from localStorage when the component mounts
  useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
          setTotalXP(userData.totalXP);
          setCurrentLevel(userData.level);
      }
  }, []);

  // Save user data to localStorage whenever totalXP or currentLevel changes
  useEffect(() => {
      const userData = {
          totalXP: totalXP,
          level: currentLevel
      };
      localStorage.setItem('userData', JSON.stringify(userData));
  }, [totalXP, currentLevel]);

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