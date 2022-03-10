import { useState, useEffect } from "react";

import {IoIosContact} from 'react-icons/io';
import styles from './Contacts.module.css';

const Contacts = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(()=> {
        
            fetch("api/contacts")
                .then((response) => response.json())
                .then((data) => {
                    setContacts(data);
                    console.log('data', data)
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
    }, []); 

    let contactsContent;
    console.log('contacgs = ' ,contacts);

    if(!contacts || contacts.length == 0)
        contactsContent = <p>No contacts</p>

    if(contacts != false && contacts.length > 0){
        contactsContent = <div><ul>{contacts.map(c => <li key={c.email}>
            <div className={styles.contact-name}><IoIosContact></IoIosContact><b>{c.firstName}</b></div>
            <div>{c.email}</div>
            <br></br>
        </li>)}</ul></div>
    }

    return <main>
        <h2>Your contacts</h2>
        {contactsContent}
    </main>


}

export default Contacts;