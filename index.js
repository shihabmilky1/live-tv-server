const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser')
require('dotenv').config();

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://shihabmilky2:shihabmilky2@cluster0.4czm1.mongodb.net/live-tv?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Working')
})
client.connect(err => {
    const tv = client.db("live-tv").collection("tv");
    app.post('/uploadTV', (req, res) => {
        tv.insertOne(req.body)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })
    app.get('/channel', (req, res) => {
        tv.find({})
            .toArray((err, doc) => {
                res.send(doc)
            })
    })
    app.get('/channel/bangla', (req, res) => {
        tv.find({ country: 'Bangladesh' })
            .toArray((err, doc) => {
                res.send(doc)
            })
    })
    app.get('/channel/india', (req, res) => {
        tv.find({ country: 'India' })
            .toArray((err, doc) => {
                res.send(doc)
            })
    })
    // app.post('/channel/playing', (req, res) => {
    //     tv.find({ name: req.body.name })
    //         .toArray((err, doc) => {
    //             res.send(doc)
    //         })
    // })
});

app.listen(process.env.PORT || 3001)