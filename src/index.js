const express = require("express");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

const Schema = new mongoose.Schema({
  title: String,
  description: String,
});
const Home = mongoose.model("Home", Schema);
const Priority = mongoose.model("Priority", Schema);
const Daily = mongoose.model("Daily", Schema);
const Weekend = mongoose.model("Weekend", Schema);
const Month = mongoose.model("Month", Schema);

const task = new Home({
  title: "Welcome Chief!",
  description: "Add Tasks in todo list",
});
let defaultTasks = [task];

// const changeList =(reqBody, listArray)=>{
//   if (reqBody.btn == "ADD") {
//     task = {
//       title: reqBody.title,
//       description: reqBody.description
//     }
//     listArray.push(task);
//   }
//   else {
//     index = reqBody.btn;
//     listArray.splice(index, 1);
//   }
// }

app.get("/", async (req, res) => {
  try {
    const data = await Home.find();
    if (data.length === 0) {
      Home.insertMany(defaultTasks)
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.error("Error saving user:", err.message);
        });
    } else {
      res.render("index", { tasks: data, action: "/", listType: "Home" });
    }
  } catch (error) {
    res.status(500).send(error.message); // Handle errors
  }
});
app.post("/", async (req, res) => {
  if (req.body.btn === "ADD") {
    try {
      const task = new Home(req.body);
      // const homeItem = new Home({
      //   title: req.body.title,
      //   description: req.body.description,
      // });
      await task.save();
    } catch (error) {
      res.status(400).send(error.message); // Handle validation errors or other errors
    }
  } else {
    try {
      const deletingID = req.body.btn;
      const t = await Home.findByIdAndRemove(deletingID);
      // console.log(t);
    } catch (error) {
      res.status(500).send(error.message); // Handle validation errors or other errors
    }
  }
  res.redirect("/");
  // changeList(req.body, tasks);
});

app.get("/priority", async (req, res) => {
  try {
    const data = await Priority.find();
    if (data.length === 0) {
      Priority.insertMany(defaultTasks)
        .then(() => {
          res.redirect("/priority");
        })
        .catch((err) => {
          console.error("Error saving user:", err.message);
        });
    } else {
      res.render("priority", {
        tasks: data,
        action: "/priority",
        listType: "Priority List",
      });
    }
  } catch (error) {
    res.status(500).send(error.message); // Handle errors
  }
});
app.post("/priority", async (req, res) => {
  if (req.body.btn === "ADD") {
    try {
      const task = new Priority(req.body);
      await task.save();
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    try {
      const deletingID = req.body.btn;
      await Priority.findByIdAndRemove(deletingID);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  res.redirect("/priority");
});

app.get("/daily", async (req, res) => {
  try {
    const data = await Daily.find();
    if (data.length === 0) {
      Daily.insertMany(defaultTasks)
        .then(() => {
          res.redirect("/daily");
        })
        .catch((err) => {
          console.error("Error saving user:", err.message);
        });
    } else {
      res.render("daily", {
        tasks: data,
        action: "/daily",
        listType: "Daily List",
      });
    }
  } catch (error) {
    res.status(500).send(error.message); // Handle errors
  }
});
app.post("/daily", async (req, res) => {
  if (req.body.btn === "ADD") {
    try {
      const task = new Daily(req.body);
      await task.save();
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    try {
      const deletingID = req.body.btn;
      await Daily.findByIdAndRemove(deletingID);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  res.redirect("/daily");
});

app.get("/weekend", async (req, res) => {
  try {
    const data = await Weekend.find();
    if (data.length === 0) {
      Weekend.insertMany(defaultTasks)
        .then(() => {
          res.redirect("/weekend");
        })
        .catch((err) => {
          console.error("Error saving user:", err.message);
        });
    } else {
      res.render("weekend", {
        tasks: data,
        action: "/weekend",
        listType: "Weekend List",
      });
    }
  } catch (error) {
    res.status(500).send(error.message); // Handle errors
  }
});
app.post("/weekend", async (req, res) => {
  if (req.body.btn === "ADD") {
    try {
      const task = new Weekend(req.body);
      await task.save();
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    try {
      const deletingID = req.body.btn;
      await Weekend.findByIdAndRemove(deletingID);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  res.redirect("/weekend");
});

app.get("/month", async (req, res) => {
  try {
    const data = await Month.find();
    if (data.length === 0) {
      Month.insertMany(defaultTasks)
        .then(() => {
          res.redirect("/month");
        })
        .catch((err) => {
          console.error("Error saving user:", err.message);
        });
    } else {
      res.render("month", {
        tasks: data,
        action: "/month",
        listType: "Monthly List",
      });
    }
  } catch (error) {
    res.status(500).send(error.message); // Handle errors
  }
});
app.post("/month", async (req, res) => {
  if (req.body.btn === "ADD") {
    try {
      const task = new Month(req.body);
      await task.save();
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    try {
      const deletingID = req.body.btn;
      await Month.findByIdAndRemove(deletingID);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  res.redirect("/month");
});

app.listen(1830, function () {
  console.log("Hi DSS❤");
});

// git init 
// git clone <<ssh code>>
// git status
// git add .
// git commit -m "commit message"
// git status

// git remote add origin <<ssh code>>
// git push -u origin master