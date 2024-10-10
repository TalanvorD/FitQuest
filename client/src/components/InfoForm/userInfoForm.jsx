import { useState } from 'react';
import { UPDATE_USER } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../index.css';


const UserInfoForm = ({ user }) => {
  const [mainGoal, setGoal] = useState('');
  const [height, setHeight] = useState('');
  const [weightTrack, setWeight] = useState('');
  const [bodyFatTrack, setBodyFat] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

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
          weight: parseFloat(weightTrack), 
          bodyfat: parseFloat(bodyFatTrack),
          userId: user._id
        },
        refetchQueries:  [{ query: QUERY_ME }, 'me']} // Refetches the users info after submission
      );

      // Clear the form fields after submission
      setGoal('');
      setHeight('');
      setWeight('');
      setBodyFat('');
      setError(''); // Clear error on successful submission

      if (location.pathname === '/formpage') {
        navigate('/'); // Redirect to homepage
      } else if (location.pathname === '/me') {
        navigate('/me'); // Stay on the me page or navigate to a different page if needed
      }
      
    } catch (error) {
      console.error("Error submitting the form:", error);
      setError("Failed to update user info. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="form-box">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Goal:</label>
      <select id="goal" value={mainGoal} onChange={(e) => setGoal(e.target.value)} required>
        <option value="">Select your goal</option>
        <option value="Strength">Strength</option>
        <option value="Intellect">Intellect</option>
        <option value="Vitality">Vitality</option>
        <option value="Stamina">Stamina</option>
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
      <button className='submit-button' type="submit" id="form-submit-button">Submit</button>
    </form>
  );
};

export default UserInfoForm;