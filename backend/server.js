import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const url = "mongodb://localhost:27017";

const app = express();

const dbName = "passMan";

const client = new MongoClient(url);

const port = process.env.PORT || 3000;
app.use(bodyParser.json())
app.use(cors())
await client.connect();

const db = client.db(dbName);
// getting all the passwords
app.get("/", async (req, res) => {
    const collection = db.collection("passwords");

    const findResult = await collection.find({}).toArray();

    res.send(findResult);
});
// posting all the passwords
app.post("/", async (req, res) => {
    const password = req.body
    const collection = db.collection("passwords");

    const findResult = await collection.insertOne(password);
    res.send({success:true,result:findResult});
});
// delete a password by id
app.delete("/", async (req, res) => {
    const password = req.body
    const collection = db.collection("passwords");

    const findResult = await collection.deleteOne(password);
    res.send({success:true,result:findResult});
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});