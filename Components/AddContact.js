import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { LoginContext } from "../store/LoginContext";

const AddContact = () => {
    const {loggedInUser} = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(false);
  const Router = useRouter();
  
  useEffect(()=> {
    if(!loggedInUser){
      Router.push('/');
    }  
  }, [])


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlefirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handlelastNameChange = (event) => {
    setLastName(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { email , firstName, lastName, userEmail: loggedInUser.email};
    
    fetch("api/contacts", {
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
      <h1>Add a contact</h1>
      <form onSubmit={handleSubmit}>
      <label>First name</label>
        <input type="text" onChange={handlefirstNameChange} value={firstName} placeholder="Enter first name" />
        <label>Last name</label>
        <input type="text" onChange={handlelastNameChange} value={lastName} placeholder="Enter last name" />
        <label>Email</label>
        <input type="email" onChange={handleEmailChange} value={email} placeholder="Enter email" />
        <input type="submit" value="Add contact" />
      </form>

        {error && <p>{error}</p>}

    </div>
  );
};

export default AddContact;
