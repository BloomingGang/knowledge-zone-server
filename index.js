const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    const booksCollection = client
      .db("knowledge-zone")
      .collection("books-collection");
    const blogCollection = client
      .db("knowledge-zone")
      .collection("blog-collection");

    // for user collection (faisal)

    const userCollection = client.db("knowledge-zone").collection("users");

    // for  class one to twelve database start

    // for courses routes  start

    const freeCourse = client.db("courses").collection("freeCourse");
    const discountCourse = client.db("courses").collection("discountCourse");
    const liveCourse = client.db("courses").collection("liveCourse");
    const specialCourse = client.db("courses").collection("specialCourse");
    const islamicCourse = client.db("courses").collection("islamicCourse");
    const kidsCourse = client.db("courses").collection("kidsCourse");
    const entertainCourse = client.db("courses").collection("entertainCourse");

    // for courses routes  start

    app.get("/books", async (req, res) => {
      const result = await booksCollection.find().toArray();
      res.send(result);
    });

    const ClassOneCourse = client.db("classOneToTwelve").collection("classOne");

    const ClassOneCourses = client
      .db("classOneToTwelve")
      .collection("classOne");
    const ClassTwoCourses = client
      .db("classOneToTwelve")
      .collection("classTwo");
    const ClassThreeCourses = client
      .db("classOneToTwelve")
      .collection("classThree");
    const ClassFourCourses = client
      .db("classOneToTwelve")
      .collection("classFour");
    const ClassFiveCourses = client
      .db("classOneToTwelve")
      .collection("classFive");
    const ClassSixCourses = client
      .db("classOneToTwelve")
      .collection("classSix");
    const ClassSevenCourses = client
      .db("classOneToTwelve")
      .collection("classSeven");
    const ClassEightCourses = client
      .db("classOneToTwelve")
      .collection("classEight");
    const ClassNineCourses = client
      .db("classOneToTwelve")
      .collection("classNine");
    const ClassTenCourses = client
      .db("classOneToTwelve")
      .collection("classTen");
    const ClassElevenCourses = client
      .db("classOneToTwelve")
      .collection("classEleven");
    const ClassTwelveCourses = client
      .db("classOneToTwelve")
      .collection("classTwelve");

    app.get("/books", async (req, res) => {
      const result = await booksCollection.find().toArray();
      res.send(result);
    });

    app.get("/blogs", async (req, res) => {
      const result = await blogCollection.find().toArray();
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

    // for  class one to twelve start
    app.get("/classOne", async (req, res) => {
      const result = await ClassOneCourses.find().toArray();
      res.send(result);
    });

    app.get("/classTwo", async (req, res) => {
      const result = await ClassTwoCourses.find().toArray();
      res.send(result);
    });
    app.get("/classThree", async (req, res) => {
      const result = await ClassThreeCourses.find().toArray();
      res.send(result);
    });

    app.get("/classFour", async (req, res) => {
      const result = await ClassFourCourses.find().toArray();
      res.send(result);
    });
    app.get("/classFive", async (req, res) => {
      const result = await ClassFiveCourses.find().toArray();
      res.send(result);
    });
    app.get("/classSix", async (req, res) => {
      const result = await ClassSixCourses.find().toArray();
      res.send(result);
    });
    app.get("/classSeven", async (req, res) => {
      const result = await ClassSevenCourses.find().toArray();
      res.send(result);
    });
    app.get("/classEight", async (req, res) => {
      const result = await ClassEightCourses.find().toArray();
      res.send(result);
    });
    app.get("/classNine", async (req, res) => {
      const result = await ClassNineCourses.find().toArray();
      res.send(result);
    });
    app.get("/classTen", async (req, res) => {
      const result = await ClassTenCourses.find().toArray();
      res.send(result);
    });
    app.get("/classEleven", async (req, res) => {
      const result = await ClassElevenCourses.find().toArray();
      res.send(result);
    });
    app.get("/classTwelve", async (req, res) => {
      const result = await ClassTwelveCourses.find().toArray();
      res.send(result);
    });

    // for  class one to twelve end
    // class one to twelve student api done

    // for course routes api create  start
    app.get("/freeCourse", async (req, res) => {
      const result = await freeCourse.find().toArray();
      res.send(result);
    });
    app.get("/discountCourse", async (req, res) => {
      const result = await discountCourse.find().toArray();
      res.send(result);
    });
    app.get("/freeCourse", async (req, res) => {
      const result = await liveCourse.find().toArray();
      res.send(result);
    });
    app.get("/specialCourse", async (req, res) => {
      const result = await specialCourse.find().toArray();
      res.send(result);
    });
    app.get("/islamicCourse", async (req, res) => {
      const result = await islamicCourse.find().toArray();
      res.send(result);
    });
    app.get("/kidsCourse", async (req, res) => {
      const result = await kidsCourse.find().toArray();
      res.send(result);
    });
    app.get("/entertainCourse", async (req, res) => {
      const result = await entertainCourse.find().toArray();
      res.send(result);
    });
    // for course routes api create  end
    // done
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("welcome to Knowledge Zone.......");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
