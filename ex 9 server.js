const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

// Connect MongoDB
async function start() {
    await client.connect();
    db = client.db("eventdb");
    console.log("MongoDB Connected");

    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
}
start();

// 👉 Register API
app.post("/register", async (req, res) => {
    const { regno, name, events } = req.body;

    if (!regno || !name || !events) {
        return res.send("All fields required");
    }

    if (events.length > 3) {
        return res.send("Maximum 3 events allowed");
    }

    const exist = await db.collection("registrations").findOne({ regno });

    if (exist) {
        return res.send("Duplicate Register Number not allowed");
    }

    await db.collection("registrations").insertOne({
        regno,
        name,
        events
    });

    res.send("Registration Successful");
});

// 👉 Search API
app.get("/search/:regno", async (req, res) => {
    const user = await db.collection("registrations")
        .findOne({ regno: req.params.regno });

    if (user) {
        res.json(user);
    } else {
        res.json({ message: "No record found" });
    }
});
