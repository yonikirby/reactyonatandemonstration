const express = require("express");
const cors = require("cors");
const app=express().use('*', cors());

var multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require("../models");
const memoryModel = db.memoryModel;
const userModel = db.userModel;
const formidable = require('formidable');
var mkdirp = require('mkdirp');

//var ref = require('ref')
  /*
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, __dirname + '../../../memorypictureuploads/')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });
*/
app.use(express.json());

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb'}); //was just bodyParser.json
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })//(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(jsonParser)


//var myBodyParser = express.bodyParser();

// Import the functions you need from the SDKs you need
const { initializeApp } =  require("firebase/app");
//const { getAnalytics } =  require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWwsD-AC0ZAUhYHmLussO8a1BBWPEkgCk",
  authDomain: "memoriesimagestorage.firebaseapp.com",
  projectId: "memoriesimagestorage",
  storageBucket: "memoriesimagestorage.appspot.com",
  messagingSenderId: "937596197960",
  appId: "1:937596197960:web:11557e2051ae45c8d8cc7d",
  measurementId: "G-BP2NLCD8SM"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebase);



function urltoFile(url, filename, mimeType){
  return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename,{type:mimeType});})
  );
}

module.exports = app => {
    console.log("in routes.js")
    const controller = require("../controllers/controller.js");
    var router = require("express").Router();

     
    router.post("/getAllUsers", controller.getAllUsers);

    router.get("/testQuery", (req, res) => {
      console.log("got into test query")
      res.json({ message: "Welcome to Memories application2." });
    })
    
    // Create a new Tutorial
    router.post("/addUser", controller.addUser);
    // Retrieve all Tutorials
    router.post("/getAllMemoriesOfOneUser", controller.getAllMemoriesOfOneUser);
    // Retrieve all published Tutorials


    const upload = multer({ dest: "api/memories/saveOneMemory" });

    router.post("/saveOneMemory", jsonParser, controller.saveOneMemory);

    
    // Retrieve a single Tutorial with id
    router.post("/validateUser", jsonParser, controller.validateUser);


    //router.post("/deleteAllUsers", controller.deleteAllUsers);

    //router.post("/deleteAllMemories", controller.deleteAllMemories);

    router.post("/forgotPassword", controller.forgotPassword);

    router.post("/getAllTokens", controller.getAllTokens);

    router.post("/forgotPasswordVerify", jsonParser, controller.forgotPasswordVerify);

    router.post("/deleteOneMemory", jsonParser, controller.deleteOneMemory);

    router.post("/updateOneMemory", jsonParser, controller.updateOneMemory);

    /*
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);
    */
    app.use('/api/memories', router);
  };

