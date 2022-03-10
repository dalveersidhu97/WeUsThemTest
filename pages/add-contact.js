import { useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import { LoginContext } from '../store/LoginContext'
import AddContact from '../Components/AddContact';

export default function AddContactPage() {

  return (
    <div>
        <AddContact></AddContact>
    </div>
  )
}
