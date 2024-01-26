// const express = require('express');
// const app = express();
// const port = 3000;
// app.get('/', (req, res) => {
//     res.send('hello world')
// })
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const ObjectId = require('mongodb').ObjectId

const port = process.env.PORT || 3000;
const users = [
    { id: 1, name: 'sey' },
    {
        id: 2, name: "gom"
    }
]
const h = {
    id: 2, name: "gom"
}
app.get('/', (req, res) => {
    res.send('heys');
})
app.get('/users', (req, res) => {

    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const rest = users.filter(user => user.name.toLowerCase().includes(search));
        res.send(rest)
    }
    else {
        res.send(users)
    }
    // console.log(query)
    // res.send(users);
});
// app.post('/user', (req, res) => {
//     console.log(req.body);
//     const user = req.body;
//     const id = users.length + 1;
//     user.id = id;
//     users.push(user);
//     res.send(user)

//     res.send('post success');
// })
app.get('/user/:id', (req, res) => {
    const param = parseInt(req.params.id);
    const user = users.find(user => user.id === param);
    res.send(user)
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tanvirhossen808:AEnXfHiIxlN1RCLH@cluster0.kv3nqll.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const dbs = client.db('myDb').collection('hey');
        app.get('/user', async (req, res) => {
            const query = {};
            const curosr = dbs.find(query);
            res.send(await curosr.toArray())
        })
        app.post('/user', async (req, res) => {
            const b = req.body;
            // console.log(b);
            const result = await dbs.insertOne(b);
            // console.log(result.insertedId);
            res.send(result)
        })
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;


            const query = { _id: new ObjectId(id) };
            const result = await dbs.deleteOne(query)
            res.send(result)
        })
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await dbs.findOne(query);
            res.send(result)

        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log('hegfgydfdfdfdd');
})