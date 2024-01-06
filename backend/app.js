const express = require("express");
const collection = require("./mongo");
const course = require("./models/courseModel")
const cors = require("cors");
var randomstring = require("randomstring");
const enroll = require("./models/enrollmentData");
const issue = require('./models/issueModel');
const { storeString, getStringCount, getStringByIndex } = require('./contract');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => { });

app.post("/register", async (req, res) => {
  const { name, email, institue, subject, position, number, password } = req.body;
  const userId = randomstring.generate(11);

  const data = {
    name: name,
    email: email,
    institue: institue,
    subject: subject,
    position: position,
    number: number,
    password: password,
    userId: userId,
  };
  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      res.json("ok");
    } else {
      res.json("Good");
      await collection.insertMany([data]);
    }
  } catch (error) {
    res.json("good");
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({ email: email });
    if (check) {
      if (check.password === password) {
        res.json(check.userId);
      } else {
        res.json("incorrect");
      }
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.json("notexist");
  }
});

app.post("/dash", async (req, res) => {
  const { id } = req.body;

  const info = await collection.findOne({ userId: id });
  if (info) {
    res.json(info);
  } else {
    res.json("Notfound");
  }
});

app.post("/course", async (req, res) => {
  const { title, dec, price, duration } = req.body;

  const courseId = randomstring.generate(11);

  const courseData = {
    title: title,
    dec: dec,
    price: price,
    duration: duration,
    courseId: courseId
  };
  try {
    const courses = await course.insertMany([courseData]);
    if (courses) {
      res.json("Added");
    } else {
      res.json("Failed");
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/courseList", async (req, res) => {
  try {
    const courseList = await course.find();
    if (courseList.length > 0) {
      res.json(courseList);
    } else {
      res.json("Failed to fetch");
      console.log("CourseList Fetching failed");
    }
  } catch (error) {
    console.log("Error at CourseList:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}); 

app.post("/enroll", async (req, res) => {
  const { courseId, title, userId, userName } = req.body

  const enrollId = randomstring.generate(11);
  const user = await enroll.findOne({ userId: userId });

  const enrollData = {
    userId: userId,
    userName: userName,
    courseId: courseId,
    title: title,
    enrollId: enrollId,
    enrollDate: Date(),
    issueStatus: "false",
  }

  try {
    const enrollment = await enroll.insertMany([enrollData])
    if (enrollment) {
      res.json('enrolled')
    } else {
      res.json("enrollFailed")
      console.log("enrollFailed")
    }
  } catch (error) {
    console.log("Something went worng at enroll")
  }
}
)
app.post("/enrolled", async (req, res) => {
  const enrolled = await enroll.find()
  if (enrolled.length > 0) {
    res.json(enrolled)
  } else {
    console.log("something went worng at enrolled")
  }
})

app.post("/issue", async (req, res) => {
  const { userName, userId, courseId, title, enrollDate, enrollId } = req.body
  const issueId = userId + courseId + enrollId
  const issueData = {
    userName: userName,
    userId: userId,
    courseId: courseId,
    title: title,
    enrollDate: enrollDate,
    enrollId: enrollId,
    issueId: issueId,
    issueDate: Date(),
    verifiedStatus: "false",
    transactionHash: "Null",
    blockHash: "Null",
    blockNumber: "Null",
    from: "Null"
  }
  try {
    const issuing = await issue.insertMany([issueData])
    await enroll.updateOne({enrollId: enrollId}, {$set:{issueStatus: "true"}}) 
    if (issuing) {
      res.json(issueId)
    } else {
      res.json("Failed")
      console.log("Failed")
    }
  } catch (error) {
    console.log("Something went worng at enroll")
  }

})

app.post('/certi', async (req, res) => {
  const { id } = req.body
  try {
    const certi = await issue.findOne({ issueId: id })
    if (certi) {
      res.json(certi)
    }
  } catch (error) {

  }

})
app.post('/verifyCerti', async (req, res) => {
  const { id } = req.body
  const transactionResult = await storeString(id);
  if (transactionResult) {
    const { transactionHash, blockHash, blockNumber, from } = transactionResult;
    try {
      const verifyCerti = await issue.updateOne({ issueId: id }, {$set:{verifiedStatus: "true", transactionHash: transactionHash, blockHash: blockHash, blockNumber: blockNumber, from: from}})
      
      if(verifyCerti){
        res.json(verifyCerti)
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log('Failed to store the string.');
  }
})
app.listen(8000, () => {
  console.log("app is running on port 8000");
});
