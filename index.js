const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
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

async function run() {
  try {
    await client.connect();
    const booksCollection = client.db("knowledge-zone").collection("books-collection");
    const blogCollection = client.db("knowledge-zone").collection("blog-collection");

    // for  class one to twelve database start

    // for courses routes  start

    const freeCourse=client.db("courses").collection("freeCourse");
    const discountCourse=client.db("courses").collection("discountCourse");
    const liveCourse=client.db("courses").collection("liveCourse");
    const specialCourse=client.db("courses").collection("specialCourse");
    const islamicCourse=client.db("courses").collection("islamicCourse");
    const kidsCourse=client.db("courses").collection("kidsCourse");
    const entertainCourse=client.db("courses").collection("entertainCourse");

    // for courses routes  start
      


    app.get('/books', async (req, res) => {
      const result = await booksCollection.find().toArray()
      res.send(result)
    })

    app.get("/blogs", async (req, res) => {
      const result = await blogCollection.find().toArray();
      res.send(result);
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

  res.send("welcome to Knowledge Zone.....");

});

app.listen(port, () => {
  console.log("listening to port", port);
});
