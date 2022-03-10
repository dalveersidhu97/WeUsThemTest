import Link from "next/link";
import { useContext, useEffect } from "react";
import { LoginContext } from "../store/LoginContext";

const Layout = (props) => {
  const { loggedInUser, login} = useContext(LoginContext);

  useEffect(()=> {
    const user = localStorage.getItem('user');
    if(user){
        login(user);
    }
  }, [])

  let navLinks;

  if (!loggedInUser) {
    navLinks = (
      <>
        <li>
          <Link href={"/"}>Login</Link>
        </li>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
      </>
    );
  } else {
    navLinks = (
      <>
        <li>
          <Link href={"/contacts"}>Contats</Link>
        </li>
        <li>
          <Link href={"/add-contact"}>Add contact</Link>
        </li>
        <h3>Logged in as {loggedInUser.firstName} <Link href={"/logout"}>Logout</Link></h3>
      </>
    );
  }
  return (
    <div className="container">
      <h1>Contact book</h1>
      <nav>
        <ul>{navLinks}</ul>
        {props.children}
      </nav>
    </div>
  );
};

export default Layout;
