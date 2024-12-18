const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// verify jwt middleware
const verifyToken = async (req, res, next) => {
  // console.log("inside verify token :", req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "tahidtaha997", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized" });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    // collections
    const usersCollection = client.db("saveBdLegacy").collection("all-users");
    const postsCollection = client.db("saveBdLegacy").collection("posts");

    app.get("/", async (req, res) => {
      res.send("SERVER IS RUNNING......");
    });

    // verify admin middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

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

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        "tahidtaha997",
        { expiresIn: "1h" }
      );

      // Send the token and user data
      res.status(200).send({
        message: "Login successful",
        token, // Include the token
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });

    // Create post with file upload support
    app.post(
      "/create-post",
      verifyToken,
      upload.array("media", 10),
      async (req, res) => {
        try {
          const {
            title,
            description,
            category,
            userEmail,
            userRole,
            userName,
          } = req.body; // Get user data from body
          const mediaPaths = req.files.map((file) => file.path); // Array of file paths

          // Determine the status based on user role
          let status;
          if (userRole === "admin" || userRole === "moderator") {
            status = "approved";
          } else {
            status = "pending";
          }

          // Construct new post object
          const newPost = {
            title,
            description,
            category,
            media: mediaPaths,
            postedBy: { userName, userEmail, userRole },
            postedOn: new Date().toLocaleDateString(),
            status, // Include status based on role
          };

          // Insert post into database
          const result = await postsCollection.insertOne(newPost);
          res
            .status(201)
            .send({ message: "Post created successfully", post: result });
        } catch (error) {
          console.error("Error creating post:", error);
          res.status(500).send({ message: "Failed to create post" });
        }
      }
    );

    // get all pending post only admin and moderator
    app.get("/pending-posts", async (req, res) => {
      const pendingPost = await postsCollection
        .find({ status: "pending" })
        .toArray();
      res.send(pendingPost);
    });

    // delete post based on id
    app.delete("/delete-post/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await postsCollection.deleteOne(query);
      res.send(result);
    });

    // Update post status (approve post)
    app.patch("/update-post/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const result = await postsCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: { status: "approved" },
          }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post status updated successfully" });
      } catch (error) {
        console.error("Error updating post status:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    // get a single post based on id
    app.get("/posts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await postsCollection.findOne(query);
      res.send(result);
    });

    // get user and user role role api
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await usersCollection.findOne(query, {
        projection: { password: 0 },
      });
      res.send(user);
    });

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
