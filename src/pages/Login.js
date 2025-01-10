// import React, { useState, useEffect } from 'react';
// import background from '../images/login.jpeg';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [state, setState] = useState('login'); // Switch between login and signup
//   const [role, setRole] = useState('');
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const selectedRole = localStorage.getItem('role');
//     if (selectedRole) {
//       setRole(selectedRole); 
//       // Set role from localStorage (admin/user)
      
//     } else {
//       navigate('/'); // If no role selected, redirect to home
//     }
//   }, [navigate]);

//   const handleSignUp = (e) => {
//     e.preventDefault(); // Prevent form submission
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const userExists = users.some((user) => user.email === email);

//     if (userExists) {
//       alert('User already exists! Please login.');
//       setState('login');
//     } else {
//       users.push({ name, email, password, role });
//       localStorage.setItem('users', JSON.stringify(users));
//       alert('Account created successfully! Please login.');
//       setState('login');
//     }

//     setName('');
//     setEmail('');
//     setPassword('');
//   };

//   const handleSignIn = (e) => {
//     e.preventDefault(); // Prevent form submission
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const validUser = users.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (validUser) {
//       if (validUser.role === role) {
//         localStorage.setItem('isAuthenticated', 'true');
//         navigate(role === 'admin' ? '/menu' : '/menu');
//       } else {
//         alert('Incorrect role! You cannot log in as this user.');
//       }
//     } else {
//       alert('Invalid email or password!');
//     }

//     setEmail('');
//     setPassword('');
//   };

//   return (
//     <form
//       onSubmit={state === 'signup' ? handleSignUp : handleSignIn}
//       className="min-vh-100 d-flex align-center justify-content-center align-items-center"
//       style={{
//         background: `url(${background}) rgba(255, 255, 255, 0.9) no-repeat`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//       }}
//     >
//       <div className="d-flex flex-column gap-3 p-4 w-50 w-sm-75 w-md-50 border rounded shadow-lg">
//         <h2 className="text-center">{state === 'signup' ? 'Create Account' : 'Login'}</h2>
//         <p className="text-center pointer">
//           Please {state === 'signup' ? 'sign up' : 'login'} to access the dashboard.
//         </p>

//         {state === 'signup' && (
//           <div className="w-100 fw-semibold form-control-lg">
//             <label>Full Name</label>
//             <input
//               className="form-control"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//             />
//           </div>
//         )}

//         <div className="w-100 fw-semibold form-control-lg">
//           <label>Email</label>
//           <input
//             className="form-control"
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//             autoComplete="off"
//           />
//         </div>

//         <div className="w-100 fw-semibold form-control-lg">
//           <label>Password</label>
//           <input
//             className="form-control"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//             autoComplete="new-password"
//           />
//         </div>

//         {state === 'signup' && (
//           <div className="w-100">
//             <label>Select Role</label>
//             <select
//               className="form-control form-control-lg"
//               onChange={(e) => setRole(e.target.value)}
//               value={role}
//               required
//             >
//               <option value="">Select Role</option>
//               <option value="admin">Admin</option>
//               <option value="user">User</option>
//             </select>
//           </div>
//         )}

//         <button
//           className="btn btn-success w-100 py-2 text-white"
//           type="submit"
//           style={{
//             borderRadius: '5px',
//             transition: 'background 0.3s',
//           }}
//         >
//           {state === 'signup' ? 'Create Account' : 'Login'}
//         </button>

//         {state === 'signup' ? (
//           <p className="text-center form-control-lg">
//             Already have an account?{' '}
//             <span
//               onClick={() => setState('login')}
//               className="text-decoration-underline cursor-pointer form-control-lg"
//             >
//               Login here
//             </span>
//           </p>
//         ) : (
//           <p className="text-center form-control-lg">
//             Don’t have an account?{' '}
//             <span
//               onClick={() => setState('signup')}
//               className="text-decoration-underline"
//             >
//               Sign up here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import background from '../images/login.jpeg';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js' // Import Firebase auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [state, setState] = useState('login'); // Switch between login and signup
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user info in localStorage or a database
      localStorage.setItem('role', role);
      alert('Account created successfully! Please login.');
      setState('login');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }

    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check role
      const savedRole = localStorage.getItem('role');
      if (savedRole === role) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate(role === 'admin' ? '/menu' : '/menu');
      } else {
        alert('Incorrect role! You cannot log in as this user.');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <form
      onSubmit={state === 'signup' ? handleSignUp : handleSignIn}
      className="min-vh-100 d-flex align-center justify-content-center align-items-center"
      style={{
        background: `url(${background}) rgba(255, 255, 255, 0.9) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className="d-flex flex-column gap-3 p-4 w-50 w-sm-75 w-md-50 border rounded shadow-lg">
        <h2 className="text-center">{state === 'signup' ? 'Create Account' : 'Login'}</h2>
        <p className="text-center pointer">
          Please {state === 'signup' ? 'sign up' : 'login'} to access the dashboard.
        </p>

        {state === 'signup' && (
          <div className="w-100 fw-semibold form-control-lg">
            <label>Full Name</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-100 fw-semibold form-control-lg">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            autoComplete="off"
          />
        </div>

        <div className="w-100 fw-semibold form-control-lg">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            autoComplete="new-password"
          />
        </div>

        {state === 'signup' && (
          <div className="w-100">
            <label>Select Role</label>
            <select
              className="form-control form-control-lg"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        )}

        <button
          className="btn btn-success w-100 py-2 text-white"
          type="submit"
          style={{
            borderRadius: '5px',
            transition: 'background 0.3s',
          }}
        >
          {state === 'signup' ? 'Create Account' : 'Login'}
        </button>

        {state === 'signup' ? (
          <p className="text-center form-control-lg">
            Already have an account?{' '}
            <span
              onClick={() => setState('login')}
              className="text-decoration-underline cursor-pointer form-control-lg"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center form-control-lg">
            Don’t have an account?{' '}
            <span
              onClick={() => setState('signup')}
              className="text-decoration-underline"
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
