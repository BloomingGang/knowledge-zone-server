const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.drzmd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function verifyJwt(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbbiden access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    await client.connect();

      //  class one_to_twelve and courses routes database start
      const classAndCourse = client.db("classes_courses_info").collection("allClassesCoursesInfo");
      //  class one_to_twelve and courses routes database end

      
    const booksCollection = client.db("knowledge-zone").collection("books-collection");
    const blogCollection = client.db("knowledge-zone").collection("blog-collection");

    // for user collection (faisal)

    const userCollection = client.db("knowledge-zone").collection("users");

   

    app.get("/books", async (req, res) => {
      const result = await booksCollection.find().toArray();
      res.send(result);
    });
  

    // create api for get class and courses information 
    app.get("/courses/:course",async(req,res)=>{
      const course=req.params.course;
      console.log(course);
      const query={classCourse:course};
      const result=await classAndCourse.find(query).toArray();
      res.send(result);
    }) 
    // after click enroll from course or class route 
    app.get("/course/:id",async(req,res)=>{
      const {id}=req.params;
      const query={_id:ObjectId(id)};
      const result=await classAndCourse.findOne(query);
      res.send(result);

    })
    app.get("/book/:id", async (req, res) => {
      const { id } = req.params;
      const queary = { _id: ObjectId(id) };
      const result = await booksCollection.findOne(queary);
      res.send(result);
    });
    const ClassOneCourse = client.db("classOneToTwelve").collection("classOne");

    app.get("/books", async (req, res) => {
      const result = await booksCollection.find().toArray();
      res.send(result);
    });

    app.get("/blogs", async (req, res) => {
      const result = await blogCollection.find().toArray();
      res.send(result);
    });
    app.get("/blog/:id", async (req, res) => {
      const { id } = req.params;
      const queary = { _id: ObjectId(id) };
      const result = await blogCollection.findOne(queary);
      res.send(result);
    });

    // for user collection (faisal)

    app.get("/user", verifyJwt, async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      const isAdmin = user?.role === "admin";
      res.send({ admin: isAdmin });
    });

    app.put("/user/admin/:email", verifyJwt, async (req, res) => {
      const email = req.params.email;
      const requester = req.decoded.email;
      const requesterAccount = await userCollection.findOne({
        email: requester,
      });
      if (requesterAccount.role === "admin") {
        const filter = { email: email };
        const updateDoc = {
          $set: { role: "admin" },
        };
        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
      } else {
        res.status(403).send({ message: "Forbidden message" });
      }
    });

    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      const token = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2d" }
      );
      res.send({ result, token });
    });


    // single course info get start

    // app.get("/classOne/:id",async(req,res)=>{
    //   const {id}=req.params;
    //   const query={_id:ObjectId(id)};
    //   const result=await ClassOneCourses.findOne(query);
    //   res.send(result);

    // })
    // app.get("/classTwo/:id",async(req,res)=>{
    //   const {id}=req.params;
    //   const query={_id:ObjectId(id)};
    //   const result=await ClassTwoCourses.findOne(query);
    //   res.send(result);

    // })
    // // singe course info get end


 
    // done
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("welcome to Knowledge Zone.aa");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
// https://immense-meadow-70411.herokuapp.com/
