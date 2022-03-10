import { useState, useEffect } from "react";
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
            <div>{c.firstName}</div>
            <div>{c.email}</div>
            <br></br>
        </li>)}</ul></div>
    }

    return <div>
        <h2>Your contacts</h2>
        {contactsContent}
    </div>


}

export default Contacts;