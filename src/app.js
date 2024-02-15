const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan")
const crypto = require("crypto")
const jquery =require("jquery")
const userRouter = require("../Router/user")
const userModel = require("../Models/user")
const cookieParser = require('cookie-parser');
const taskrouter = require("../Router/taskrouter")
const taskrouter2 =require("../Router/task2")
const task2Order =require("../Router/task2Order")
const bodyparser = require("body-parser")
const path = require("path")
const hbs = require("hbs");
const { imageupload } = require("../Models/upload");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded())
// app.use(jquery);
app.use(morgan("dev"))
require('../connect/connect')
require("dotenv").config()
app.use(userRouter);
app.use(task2Order)
app.use(cookieParser());
app.use(taskrouter)
app.use(taskrouter2)
app.use(bodyparser())

// function generateToken(){
//     let secretKey=crypto.randomBytes(32).toString("hex")
//     console.log(secretKey)
// }
// generateToken()


// for pages ///////////////////////////////////////////////////////////////////
const publicDirectory = path.join(__dirname, '../publicPage')
app.use(express.static(publicDirectory))
const uploasDirectory =path.join(__dirname ,"../uploads")


app.use("/task1Inf" ,express.static("./uploads"))
app.use("/showCars", express.static("./images"))

app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, "../pages/views")
app.set("views", viewsDirectory)
app.get('/login', (req, res) => {
  res.render('login', {
    email: "Email address:",
    password: "Password:"
  })
})
app.get('/Home', (req, res) => {
  res.render('Home', {
  })
})
app.get('/task1', (req, res) => {
  res.render('task1', {
  })
})
app.get('/developerPage', (req, res) => {
  res.render('developerPage', {
  })
})
app.get('/userDetails', (req, res) => {
  res.render('userDetails', {
  })
})
  
app.get('/apiUpdate', (req, res) => {
  res.render('apiUpdate', {
  })
})
app.get('/UserInf', (req, res) => {
  res.render('UserInf', {
  })
})
app.get('/updataUser', (req, res) => {
  res.render('updataUser', {

  })
})
app.get('/task2OrderDetails', (req, res) => {
  res.render('task2OrderDetails', {

  })
})
app.get('/showOrderofCars', (req, res) => {
  res.render('showOrderofCars', {

  })
})
app.get('/deleteUser', (req, res) => {
  res.render('deleteUser', {
  })
})
app.get('/tasksDetails', (req, res) => {
  res.render('tasksDetails', {
  })
})
app.get('/task1Inf', (req, res) => {
  res.render('task1Inf', {
  })
})
app.get('/task2Details', (req, res) => {
  res.render('task2Details', {
  })
})
app.get('/task2', (req, res) => {
  res.render('task2', {
  })
})
app.get('/showCars', (req, res) => {
  res.render('showCars', {
  })
})
app.get('/inf-new-car', (req, res) => {
  res.render('inf-new-car', {
  })
})










app.all("*", (req, res) => {
  res.status(404).send()
})

function db() {
  const URLDB = process.env.DBCONNECT
  mongoose.connect(URLDB)
    .then(() => {
      console.log("db connected")
    }).catch(() => {
      console.log("error in connection")
    })
}
db()
app.listen(port, () => {
  console.log("All Right you are in port  " + port)
})
