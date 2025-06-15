const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mern-blog.pesr2.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const databse = client.db(process.env.MONGODB_DATABASE || 'mern-blog')

exports.client = client;
exports.databse = databse;


