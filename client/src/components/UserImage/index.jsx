import strengthImg from '../../assets/warriorfq.png';
import intellectImg from '../../assets/wizardfq.png';
import staminaImg from '../../assets/roguefq.png';
import vitalityImg from '../../assets/vitalityfq.jpg';
import '../../index.css';

const UserImage = ({
    userGoal,
}) => {
    if (!userGoal) {
        return <h3>No user to show!</h3>;
    }

    const expr = userGoal;
    switch (expr) {
        case 'Strength':
            return ( <img src={strengthImg} className="profile-pic" />);
        case 'Intellect':
            return ( <img src={intellectImg} className="profile-pic" />)
        case 'Stamina':
            return ( <img src={staminaImg} className="profile-pic" />)
        case 'Vitality':
            return ( <img src={vitalityImg} className="profile-pic" />)
    };
};

export default UserImage;