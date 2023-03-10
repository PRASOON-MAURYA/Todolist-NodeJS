const express = require("express");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "../public")));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

let task
let index
let tasks = [{ title: "Welcome Chief!", description: "Add Tasks in todo list" }];
let priorities = [];
let dailys = [];
let weekends = [];
let monthlys = [];


const changeList =(reqBody, listArray)=>{
  if (reqBody.btn == "ADD") {
    task = {
      title: reqBody.title,
      description: reqBody.description
    }
    listArray.push(task);
  }
  else {
    index = reqBody.btn;
    listArray.splice(index, 1);
  }
}

app.get("/", (req, res) => {
  res.render("index", { tasks: tasks, action: "/", listType: "Home" })
});
app.post("/", (req, res) => {
  changeList(req.body, tasks);
  res.redirect("/")
});

app.get("/priority", (req, res) => {
  res.render("priority", { tasks: priorities, action: "/priority", listType: "Priority List" })
});
app.post("/priority", (req, res) => {
  changeList(req.body, priorities);
  res.redirect("/priority")
});

app.get("/daily", (req, res) => {
  res.render("daily", { tasks: dailys, action: "/daily", listType: "Daily List" })
});
app.post("/daily", (req, res) => {
  changeList(req.body, dailys);
  res.redirect("/daily")
});

app.get("/weekend", (req, res) => {
  res.render("weekend", { tasks: weekends, action: "/weekend", listType: "Weekend List" })
});
app.post("/weekend", (req, res) => {
  changeList(req.body, weekends);
  res.redirect("/weekend")
});

app.get("/monthly", (req, res) => {
  res.render("monthly", { tasks: monthlys, action: "/monthly", listType: "Monthly List" })
});
app.post("/monthly", (req, res) => {
  changeList(req.body, monthlys);
  res.redirect("/monthly")
});




app.listen(1830, function () {
  console.log("Hi DSS❤");
});