import { connectToDatabase } from "../../../db/mongodb"

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
  }

const insertContact = async (contactData) => {
    const {db} = await connectToDatabase();
    const contact = await db.collection("contacts").insertOne(contactData);
    return contact;
}

const handlePost = async (req, res) => {
    const {firstName, lastName, email, userEmail} = req.body;

    // Input Validation
    if(!firstName || !lastName || !email || !userEmail || firstName.trim()=='' || lastName.trim=='' || email.trim() =='' || userEmail.trim() =='')
          return res.status(500).json({error: 'All the fields are required'})
  
      // inserting the contact
      await insertContact({firstName, lastName, email, userEmail});
  
      // response
      res.status(200).json({status: "success"})
}

const handleGet = async (req, res) => {
    const {db} = await connectToDatabase();
    
    
    // filter queries
    let queries = {}

    const contacts = await db.collection("contacts").find({}).toArray();
    res.status(200).json(contacts);

}


export default async function handler(req, res) {

    if(req.method == 'POST'){
        handlePost(req, res)
    }

    if(req.method == 'GET'){
        handleGet(req, res)
    }

}

