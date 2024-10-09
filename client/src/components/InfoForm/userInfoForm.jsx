import { useState } from 'react';
import { UPDATE_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const UserInfoForm = () => {
  const [mainGoal, setGoal] = useState('');
  const [height, setHeight] = useState('');
  const [weightTrack, setWeight] = useState('');
  const [bodyFatTrack, setBodyFat] = useState('');
  const [error, setError] = useState('');

  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainGoal || !height || !weightTrack || !bodyFatTrack) {
      setError("All fields are required.");
      return;
    }

    try {
      await updateUser({ 
        variables: { 
          mainGoal, 
          height: parseFloat(height), 
          weightTrack: parseFloat(weightTrack), 
          bodyFatTrack: parseFloat(bodyFatTrack) 
        } 
      });
      // Clear the form fields after submission
      setGoal('');
      setHeight('');
      setWeight('');
      setBodyFat('');
      setError(''); // Clear error on successful submission
    } catch (error) {
      console.error("Error submitting the form:", error);
      setError("Failed to update user info. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Goal:</label>
      <select id="goal" value={mainGoal} onChange={(e) => setGoal(e.target.value)} required>
        <option value="">Select your goal</option>
        <option value="strength">Strength</option>
        <option value="intellect">Intellect</option>
        <option value="vitality">Vitality</option>
        <option value="stamina">Stamina</option>
      </select>
      <br />
      <label>Height (in):</label>
      <input 
        id="height"
        type="number" 
        value={height} 
        onChange={(e) => setHeight(e.target.value)} 
        required 
      />
      <br />
      <label>Weight (lb):</label>
      <input 
        id="weight"
        type="number" 
        value={weightTrack} 
        onChange={(e) => setWeight(e.target.value)} 
        required 
      />
      <br />
      <label>Body Fat (%):</label>
      <input 
        id="bodyFat"
        type="number" 
        step="0.1"
        value={bodyFatTrack} 
        onChange={(e) => setBodyFat(e.target.value)} 
        required 
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInfoForm;