import { useNavigate } from 'react-router-dom';
import './layout.css';

function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <p className="logo">Logo</p>
      <ul>
        <li>Home</li>
        <li
          onClick={() => navigate('/product-search')}
          className="cursor-pointer"
        >
          Products
        </li>
        <li onClick={() => navigate('/login')}>Log In</li>
        <li>Sign Up</li>
      </ul>
    </div>
  );
}

export default Header;
