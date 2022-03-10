import { Router } from "next/router";
import { useState, useContext } from "react";
import { LoginContext } from "../store/LoginContext";

import { getCookies, setCookies, removeCookies } from 'cookies-next';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const {login, loggedInUser} = useContext(LoginContext);
    
  if(loggedInUser){
    Router.replace('/contacts');
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { email, password };
    
    fetch("api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if(data.status == 'success'){
            login(data.user);
            localStorage.setItem('user', data.user)
            setCookies('email', data.user.email);
            setError(false);
        }
        if(data.status == 'failed')
            setError(data.error)
        
      })
      .catch((error) => {
          setError(error);
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" onChange={handleEmailChange} value={email} placeholder="Enter email" />
        <label>Password</label>
        <input type="password" onChange={handlePasswordChange} value={password} placeholder="Enter email" />
        <input type="submit" value="Login" />
      </form>

        {error && <p>{error}</p>}

    </div>
  );
};

export default Login;
