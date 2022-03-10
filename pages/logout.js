import { useContext, useEffect } from 'react'
import { Router } from "next/router";
import { LoginContext } from '../store/LoginContext'

export default function Home() {

  const {logout} = useContext(LoginContext);

  useEffect(()=> {
    logout();
    localStorage.removeItem('user')
    Router.push('/');
  }, [])

    
  return (
    <div>
    </div>
  )
}
