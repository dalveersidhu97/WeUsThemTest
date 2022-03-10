

import { MongoClient } from 'mongodb';


let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    let client = new MongoClient("mongodb+srv://dalveersidhu97:3q5vThotLgTVhePS@cluster0.v2aom.mongodb.net/WeUsThemTest?retryWrites=true&w=majority");
    //let client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    let db = client.db("WeUsThemTest");

    // set cache
    cachedClient = client;
    cachedDb = db;

    console.log('Connected to db');

    return {
        client: cachedClient,
        db: cachedDb,
    };
}