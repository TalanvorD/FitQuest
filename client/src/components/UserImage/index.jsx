import strengthImg from '../../assets/warriorfq.png';
import intellectImg from '../../assets/wizardfq.png';
import staminaImg from '../../assets/roguefq.png';
import vitalityImg from '../../assets/vitalityfq.jpg';

const UserImage = ({
    userGoal,
}) => {
    if (!userGoal) {
        return <h3>No user to show!</h3>;
    }

    const expr = userGoal;
    switch (expr) {
        case 'Strength':
            return ( <img src={strengthImg} />);
        case 'Intellect':
            return ( <img src={intellectImg} />)
        case 'Stamina':
            return ( <img src={staminaImg} />)
        case 'Vitality':
            return ( <img src={vitalityImg} />)
    };
};

export default UserImage;