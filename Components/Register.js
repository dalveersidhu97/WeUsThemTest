import { Router } from "next/router";
import { useState, useContext } from "react";
import { LoginContext } from "../store/LoginContext";

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const {login, loggedInUser} = useContext(LoginContext);
    
  if(loggedInUser){
    Router.replace('/contacts');
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlefirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handlelastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { email, password , firstName, lastName};
    
    fetch("api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if(data.status == 'success'){
            Router.push('/')
        }else {
            setError(data.error)
        }
      })
      .catch((error) => {
          setError(error);
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
      <label>First name</label>
        <input type="text" onChange={handlefirstNameChange} value={firstName} placeholder="Enter first name" />
        <label>Last name</label>
        <input type="text" onChange={handlelastNameChange} value={lastName} placeholder="Enter last name" />
        <label>Email</label>
        <input type="email" onChange={handleEmailChange} value={email} placeholder="Enter email" />
        <label>Password</label>
        <input type="password" onChange={handlePasswordChange} value={password} placeholder="Enter password" />
        <input type="submit" value="Register" />
      </form>

        {error && <p>{error}</p>}

    </div>
  );
};

export default Register;
