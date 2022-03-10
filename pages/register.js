import { useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import { LoginContext } from '../store/LoginContext'
import Register from '../Components/Register'

export default function RegisterPage() {

  return (
    <div>
        <Register></Register>
    </div>
  )
}
