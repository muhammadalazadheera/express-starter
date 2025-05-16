const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mern-blog.pesr2.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const databse = client.db('mern-blog')
        const usersCollection = databse.collection('users')

        /**
         * INSERT A NEW USER TO USERS COLLECTION
        */
        app.post('/users', async (req, res) => {
            const user = req.body;

            const result = await usersCollection.insertOne(user)
            res.json({
                'status': 200,
                'message': result
            })
        })

        /**
         * GET ALL THE USERS FROM USERS COLLECTION
        */
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find();

            const result = await cursor.toArray()

            res.json({
                "status": 200,
                "message": result
            })
        })

        /**
         * UPDATE AN USER 
        */
       app.patch('/user/:id', async (req, res) => {
        const id = req.params.id;
        const reqBody = req.body;
        const user = {
            _id: new ObjectId(id)
        }
        const query = {
            $set: {
                reqBody
            }
        }
        const result = await usersCollection.updateOne(user, query)

        res.json({
            "status": 200,
            "message": result
        })
       })

        /**
         * GET A USER FROM USERS COLLECTION BY ID
        */
       app.get('/user/:id', async (req, res) => {
        const id = req.params.id;
        const query = {
            _id: new ObjectId(id)
        }
        const result = await usersCollection.findOne(query)

        res.json({
            "status": 200,
            "message": result
        })

       })

        /**
         * DELETE A USER FROM USERS COLLECTOIN
        */
        app.delete('/user/:id', async(req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const result = await usersCollection.deleteOne(query)

            res.json({
                "status":200,
                "message": result
            })
        })

        

    } finally {
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Service is running on port http://localhost:${port}`)
})