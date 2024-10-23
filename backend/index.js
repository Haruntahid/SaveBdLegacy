const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.json());
// db savebdlegacy h7TVTpAFO29HFMNq

const uri = `mongodb+srv://savebdlegacy:h7TVTpAFO29HFMNq@cluster0.dde1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // collections
    const usersCollection = client.db("saveBdLegacy").collection("all-users");

    app.get("/", async (req, res) => {
      res.send("SERVER IS RUNNING......");
    });

    // registration api post
    app.post("/registration", async (req, res) => {
      const { name, email, password } = req.body;

      //   check email already exist
      const query = { email: email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        name,
        email,
        password: hashedPassword,
        role: "user", // Assign a default role
      };

      // Insert the new user into the database
      const result = await usersCollection.insertOne(newUser);

      // Send a success response
      res.status(201).send(result);
    });

    // login api
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;

      // Find user by email
      const user = await usersCollection.findOne({ email: email });

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      // Send a success response along with user data (you may exclude the password)
      res.status(200).send({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });

    // create post
    app.post("/create-post", async (req, res) => {});

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));
