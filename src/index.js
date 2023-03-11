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



const dict = {
  priority: Priority,
  daily: Daily,
  weekend: Weekend,
  month: Month,
};
app.get("/:listType", async (req, res) => {
  try {
    const listType = req.params.listType;
    const Collection = dict[listType];

    const data = await Collection.find();
    if (data.length === 0) {
      Collection.insertMany(defaultTasks)
        .then(() => {
          res.redirect("/" + listType);
        })
        .catch((err) => {
          console.error("Error saving user:", err.message);
        });
    } else {
      const k = listType.charAt(0).toUpperCase() + listType.slice(1); // TO CAPITALISE FIRST LETTER OF THE INPUT URL FOR SHOWING AS A LIST HEADING
      res.render(listType, {
        tasks: data,
        action: "/" + listType,
        listType: k,
      });
    }
  } catch (error) {
    res.status(500).send("error.message"); // Handle errors
  }
});
app.post("/:listType", async (req, res) => {
  const listType = req.params.listType;
  const Collection = dict[listType];
  if (req.body.btn === "ADD") {
    try {
      const task = new Collection(req.body);
      await task.save();
    } catch (error) {
      res.status(400).send(error.message); // Handle validation errors or other errors
    }
  } else {
    try {
      const deletingID = req.body.btn;
      const t = await Collection.findByIdAndRemove(deletingID);
    } catch (error) {
      res.status(500).send(error.message); // Handle validation errors or other errors
    }
  }
  res.redirect("/" + listType);
});


app.listen(1830, function () {
  console.log("Hi DSS❤");
});
