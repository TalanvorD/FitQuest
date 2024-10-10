import '../index.css';
import '../App.css';
import { Link } from 'react-router-dom'; // Import Link

const LandingPage = () => {

return (
    <main id="landing-main">   
      <img id="landing-page-bg" src="/homepage-bg-2.webp"></img>
      <div id="landing-content">
        <h2>Welcome Traveler to <span id="fitquest-span">FitQuest!</span></h2>
        <p>In a world where every day presents a choice between the mundane and the extraordinary, you stand at the crossroads of opportunity. 
            Imagine a realm where your daily good habits transform into thrilling quests, where every small victory contributes to a grand adventure. 
            This is the world of <strong>FitQuest</strong>—a captivating application designed to guide you on a transformative journey towards self-improvement.
        </p>
        <Link to="/login">
            <button id="landingpage-btn">Let the journey begin!</button>
        </Link>
      </div>
    </main>
  );
}

export default LandingPage;

