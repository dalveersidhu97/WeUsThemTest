import Link from "next/link";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { LoginContext } from "../store/LoginContext";

const Layout = (props) => {
  const { loggedInUser, login} = useContext(LoginContext);

  useEffect(()=> {

    const fn = async () => {
      return await localStorage.getItem('user');
    }

    const fn2 = async () => {
      const user = await fn();
      login(user);
    }
    fn2();
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
          <Link href={"/contacts"}>Contacts</Link>
        </li>
        <li>
          <Link href={"/add-contact"}>Add contact</Link>
        </li>
        <li><h3>Logged in as {loggedInUser.firstName} <Link href={"/logout"}>Logout</Link></h3></li>
      </>
    );
  }
  return (
    <>
    <div className="container">
      <h1>Contact book</h1>
      <nav>
        <ul>{navLinks}</ul>
        {props.children}
      </nav>
    </div>
    </>
  );
};

export default Layout;
