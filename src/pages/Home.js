import background from '../images/home3.jpeg'
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    localStorage.setItem('role', role); // Store the selected role in localStorage
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="container min-vh-100 text-center d-flex flex-column justify-content-center align-items-center"
    // Add image to the background

    style={{
        background: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', 
      }}
    >
      <h1 className="my-4">Welcome to the Food Delivery App</h1>
      <p>Choose your login role</p>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-success"
          onClick={() => handleRoleSelection('admin')}
        >
          Admin Login
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleRoleSelection('user')}
        >
          User Login
        </button>
      </div>
    </div>
  );
}

export default Home;
