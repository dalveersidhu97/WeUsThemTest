import { useContext } from 'react'
import Login from '../Components/Login'
import { LoginContext } from '../store/LoginContext'
import Contacts from '../Components/Contacts';

export default function Home() {

  const {loggedInUser} = useContext(LoginContext);

  let pageContent;
  console.log(loggedInUser)
  if(loggedInUser)
    pageContent = <Contacts></Contacts>
  else 
    pageContent = <Login></Login>

  return (
    <div>
      {pageContent}
    </div>
  )
}
