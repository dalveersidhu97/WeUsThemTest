import { connectToDatabase } from "../../../db/mongodb"

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
  }

const isUserValid = async (email, password) => {
    const {db} = await connectToDatabase();
    const projection = {"password": 0}
    const user = await db.collection("user").findOne({"email": email, "password": password}, {projection});
    return user;
}


export default async function handler(req, res) {

  const {email, password} = req.body;

  // Input Validation
  if(!email || !password || email.trim() =='')
        return res.status(200).json({error: 'All the fields are required', status: 'failed'})

    if(password.trim().length < 8)
        return res.status(200).json({error:'password must be atleast 8 charachters.', status: 'failed'})

    // checking if the email and pass is valid
    const user = await isUserValid(email, password);

    if(!user)
        return res.status(500).json({error: 'Incorrect eamil or password', status: 'failed'})

    // response
    return res.status(200).json({user, status: 'success'});
}

