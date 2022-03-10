import { useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import { LoginContext } from '../store/LoginContext'

export default function Home() {

  const {logout} = useContext(LoginContext);
  const router = useRouter();

  useEffect(()=> {
    logout();
    localStorage.removeItem('user')
    router.push('/');
  }, [])

    
  return (
    <div>
    </div>
  )
}
