import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4 footer">
      <div className="container text-center mb-5">
        <h4>
          Created By
        </h4>
      </div>
      <div id="creator-links">
        <a target="_blank" href="https://github.com/TalanvorD"><h2>TalanvorD</h2></a>
        <a target="_blank" href="https://github.com/shyanrafer"><h2>shyanrafer</h2></a>
        <a target="_blank" href="https://github.com/WillZovo94"><h2>WillZovo94</h2></a>
      </div>
    </footer>
  );
};

export default Footer;
