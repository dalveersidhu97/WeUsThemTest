import { connectToDatabase } from "../../../db/mongodb"

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
  }

const emailExists = async (email) => {
    const {db} = await connectToDatabase();
    const collection = await db.collection("user")
    const user = await collection.findOne({email});
    console.log(user);
    return user;
}

const insertUser = async (userData) => {
    const {db} = await connectToDatabase();
    const user = await db.collection("user").insertOne(userData);
    return user;
}

export default async function handler(req, res) {

  const {firstName, lastName, email, password} = req.body;

  // Input Validation
  if(!firstName || !lastName || !email || !password || firstName.trim()=='' || lastName.trim=='' || email.trim() =='')
        return res.status(500).json({error: 'All the fields are required'})

    if(password.trim().length < 8)
        return res.status(500).json({error:'password must be atleast 8 charachters.'})

    // checking if the user already exists
    const user = await emailExists(email);

    if(user)
        return res.status(500).json({error: 'Email already exists!'})

    // inserting the user
    const insertedUser = await insertUser({firstName, lastName, email, password});

    // response
    res.status(200).json({status: 'success'})
}

