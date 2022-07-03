const express = require("express");
const cors = require("cors");
const app=express().use('*', cors());
const mongoose = require("mongoose");
//var multer = require('multer');
//const fs = require('fs');
//const path = require('path');
const db = require("../models");
const Item = db.itemModel;
const User = db.userModel;
//const formidable = require('formidable');
//var mkdirp = require('mkdirp');

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
//app.use(express.json());

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb'}); //was just bodyParser.json
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })//(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(jsonParser)


//var myBodyParser = express.bodyParser();

// Import the functions you need from the SDKs you need
//const { initializeApp } =  require("firebase/app");
//const { getAnalytics } =  require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
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
//const analytics = getAnalytics(firebase);*/



function urltoFile(url, filename, mimetype){
  return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename,{type:mimetype});})
  );
}

module.exports = app => {
    console.log("in routes.js")
    //const controller = require("../controllers/controller.js");
    var router = require("express").Router();
/*
     
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


*/
router.post('/deleteallusers', jsonParser, async (req, res) => {
    let myUsers = User 
    .find({})
    .remove().exec().then((response) => {
      res.json("All users deleted.");
    })
    
    .catch(err => {
      res.status(500).send(
        err
      );
    });
})

router.post('/deleteallitems', jsonParser, async (req, res) => {
    let myUsers = Item 
    .find({})
    .remove().exec().then((response) => {
      res.json("All items deleted.");
    })
    
    .catch(err => {
      res.status(500).send(
        err
      );
    });
})

router.post('/userlikesitem', jsonParser, async (req, res) => {
    if (!req.body.email) {
        res.status(400).send({ message: "Email can not be empty!" });
        return;
    }

    console.log("myEmail: " + req.body.email)
    var myEmail = req.body.email;


    let myclothingtype = req.body.clothingtype;
    
    let myColor = req.body.color;
    let myBrand = req.body.brand;
    let myGender = req.body.gender;
    let mySize = req.body.size;
    let myTitle = req.body.title;
    let myDescription = req.body.description;
    let myPrice = req.body.price;
    let myImage = req.body.image;
    let myURL = req.body.url;

    let myUser = User 
    .find({email: myEmail})
    .then((userlist) => {

        if (userlist.length == 0){
            return res.status(404).json({
                message: 'email not found',
                });

        }



        if (!userlist[0].num_total_items_liked){
            userlist[0].num_total_items_liked = 0;
        }
        userlist[0].num_total_items_liked++;

        console.log("myliked: " + userlist[0].num_total_items_liked)

        var num_total_items_liked = userlist[0].num_total_items_liked;

        var myItem = {
          title: myTitle,
          description: myDescription,
          color: myColor,
          clothingtype: myclothingtype,
          size: mySize,
          brand: myBrand,
          gender: myGender,
          price: myPrice,
          image: myImage,
          url: myURL
        }


        if (userlist[0].last_5_items_liked == undefined){
            userlist[0].last_5_items_liked = [];
        }

        
        var myLength = userlist[0].last_5_items_liked.length;
        if (myLength == 5){
                    //for (var i = 0; i < 4; i++){
                      //          var newVar = userlist[0].last_5_items_liked[i + 1];
                        //        userlist[0].last_5_items_liked[i] = newVar;
                        
                    //}
                    userlist[0].last_5_items_liked.splice(0, 1);//at position 4, remove one item
        }
        var myResultingID;
        //const getMyID = async()=>{

        var myItem = new Item (
            {title: myTitle,
                description: myDescription,
                color: myColor,
                clothingtype: myclothingtype,
                size: mySize,
                brand: myBrand,
                gender: myGender,//0 Male, 1 Female
                price: myPrice,
                image: myImage, 
                url: myURL}
 
        )
        myItem.save(
           ).then((response)=>{
                const _id = response._id;
                console.log("myresponse" + JSON.stringify(response));
                myResultingID = _id.toString();
                console.log("myresponse2: " + myResultingID)
                userlist[0].last_5_items_liked.push(myResultingID);
        
        
        
        //} 

        //getMyID();
/*
        getMyID().then(function(result) {
            userlist[0].last_5_items_liked.push(result);
            myResultingID = result;
        })*/
 
 
        var myVar;
        if (userlist[0].all_items_weights != undefined){
                            console.log("got here 1")
                            var haveIModified = false;
                            for (const i in userlist[0].all_items_weights) {  
                                console.log("got here 3")
                                if (userlist[0].all_items_weights[i].clothingtype == myclothingtype
                                    && userlist[0].all_items_weights[i].gender == myGender){
                                    console.log("got here 4")
                                    var haveIModified = true;
                                    
                                    if (userlist[0].all_items_weights[i].lastfive == undefined){
                                        userlist[0].all_items_weights[i].lastfive = [];
                                    }

                                    
                                    var myLength = userlist[0].all_items_weights[i].lastfive.length;
                                    if (myLength == 5){
                                                //for (var k = 0; k < 4; k++){
                                                    
                                                  //          userlist[0].all_items_weights[i].lastfive[k] = userlist[0].all_items_weights[i].lastfive[k + 1];
                                                    
                                                //}
                                                userlist[0].all_items_weights[i].lastfive.splice(0, 1);//at position 0, remove one item
                                    }
                                    
                                    

                                   
                                        userlist[0].all_items_weights[i].lastfive.push(myResultingID);
                                    

//                              
                                    console.log("totallikes: " + userlist[0].all_items_weights[i].totallikes)
                                    if (userlist[0].all_items_weights[i].totallikes == undefined){
                                        userlist[0].all_items_weights[i].totallikes = 0;
                                    }

                                    userlist[0].all_items_weights[i].totallikes++;
                                    
                                  
                                    
                                    var foundAColorMatch = false;
                                    for (var j in userlist[0].all_items_weights[i].color){
                                        
                                            if (userlist[0].all_items_weights[i].color[j].colorname == myColor){
                                                userlist[0].all_items_weights[i].color[j].numoccurances++;
                                                foundAColorMatch = true;
                                            }
                                        
                                    }
                                    if (!foundAColorMatch){
                                        userlist[0].all_items_weights[i].color.push({colorname:myColor, numoccurances:1})
                                    }


                                    var foundABrandMatch = false;
                                    for (var j in userlist[0].all_items_weights[i].brand){
                                        if (userlist[0].all_items_weights[i].brand[j].brandname == myBrand){
                                            userlist[0].all_items_weights[i].brand[j].numoccurances++;
                                            foundABrandMatch = true;
                                        }
                                    }
                                    if (!foundABrandMatch){
                                        userlist[0].all_items_weights[i].brand.push({brandname:myBrand, numoccurances:1})
                                    }


                                    console.log("got here 6")
                                    console.log("myPrice:" + myPrice);

                                    //myPrice = Decimal128.fromInt(myPrice);
                                    //mySize = Decimal128.fromInt(mySize);
                                    //myGender = Decimal128.fromInt(myGender);



                                    //userlist[0].all_items_weights[i].price = userlist[0].all_items_weights[i].price * userlist[0].all_items_weights[i].totallikes;
                                    
                                    userlist[0].all_items_weights[i].price = ((userlist[0].all_items_weights[i].price * (userlist[0].all_items_weights[i].totallikes - 1.0)) + myPrice)/userlist[0].all_items_weights[i].totallikes;
                                    userlist[0].all_items_weights[i].size = ((userlist[0].all_items_weights[i].size * (userlist[0].all_items_weights[i].totallikes - 1.0)) + mySize)/userlist[0].all_items_weights[i].totallikes;
                                    
                                    break;
                                }
                            
                        }
                        if (!haveIModified){
                                console.log("got here 5")
                                
                                var myLength = userlist[0].all_items_weights.length;
                                console.log("my length:" + myLength)

                                userlist[0].all_items_weights.push({
                                    
                                    clothingtype: myclothingtype,
                                    totallikes: 1,
                                    color: [{
                                        colorname: myColor,
                                        numoccurances: 1
                                    }],
                                    price: myPrice,
                                    size: mySize,
                                    brand: [
                                        {
                                        brandname: myBrand,
                                        numoccurances : 1
                                        }
                                    ],
                                    gender: myGender,
                                    lastfive: [
                                        myResultingID
                                    ]
                                });
 
                                
                        }
        }
        else {//should never happen
            /*
            console.log("got here 2345")
            userlist[0].all_items_weights[0].lastfive[0] = [];
            userlist[0].all_items_weights[0].lastfive[0].title = myTitle;
            userlist[0].all_items_weights[0].lastfive[0].description = myDescription;
            userlist[0].all_items_weights[0].lastfive[0].color = myColor;
            userlist[0].all_items_weights[0].lastfive[0].clothingtype = myclothingtype;
            userlist[0].all_items_weights[0].lastfive[0].size = mySize;
            userlist[0].all_items_weights[0].lastfive[0].brand = myBrand;
            userlist[0].all_items_weights[0].lastfive[0].gender = myGender;
            userlist[0].all_items_weights[0].lastfive[0].price = myPrice;
            userlist[0].all_items_weights[0].lastfive[0].image = myImage;
            userlist[0].all_items_weights[0].lastfive[0].url = myURL;


                                    //i.lastfive = [myItem,null,null,null,null]


                                    userlist[0].all_items_weights[0].totallikes = 1;
                                    
                                    
                        
                                    userlist[0].all_items_weights[0].color.push({colorname:myColor, numoccurances:1})
                                    

                                    userlist[0].all_items_weights[0].brand.push({brandname:myBrand, numoccurances:1})
                                   



                                    
                                    userlist[0].all_items_weights[0].price = myPrice;
                                    userlist[0].all_items_weights[0].size = mySize;
                                    userlist[0].all_items_weights[0].gender = myGender;
*/
        }
        //update all other weights now 

        userlist[0].save().then((resp) => {
            res.status(200).send({
                message: "Item stored successfully."
                  
            });

        })
        
    })
    
    .catch(err => {
      res.status(500).send(
        err
      );
    });

})
})

router.post('/getallusers', async (req, res) => {
    // Validate request
    
    console.log("in get all users function")

    let myUsers = User 
    .find()
    .then((response) => {
         console.log("get all users response:" + JSON.stringify(response));
    if (!response) {
      console.log("get all users response false:" + JSON.stringify(response));
        return res.status(404).json({
        message: 'data not found',
        });
    } 
    //return response;
    console.log("get all users response true:" + JSON.stringify(response));
    res.json(response);
    //res.write(response);
    });
  })


  router.post('/getallitems', async (req, res) => {
    // Validate request
    
    console.log("in get all users function")

    let myUsers = Item 
    .find()
    .then((response) => {
         console.log("get all users response:" + JSON.stringify(response));
    if (!response) {
      console.log("get all users response false:" + JSON.stringify(response));
        return res.status(404).json({
        message: 'data not found', 
        });
    } 
    //return response;
    console.log("get all users response true:" + JSON.stringify(response));
    res.json(response);
    //res.write(response);
    });
  })



    router.get('/user/:email/:password', async (req, res) => {
      const { email, password } = req.params
      try {
          const user = await User.findOne({
              attributes:['id', 'name', 'gender', 'email'],
              where: {
                  [Op.and]: [
                      { email: email },
                      { password: password }
                  ]
              }
          })
          user ? res.status(200).send(user) :res.status(404).send('wrong email or password')
      } catch (err) { res.status(400).send(err)}
  })
  
  router.post('/user', async (req, res) => {
      try {
          const response = await User.create(req.body)
          const { id, name, email, gender } = response
          res.status(200).send ({user : {id, name, gender, email }})
      } catch (err) { res.status(400).send('email exists') }
  })
  
  
  router.get('/:userId/userLikedItems', async (req, res) => {
      try {
          const user = await User.findOne({
              where: { id: req.params.userId },
              include: [{model: Item, through: { where: {isLike: true} } }],
          })
          res.send(user.Items)
      } catch (err) { res.send(err) }
  })
  
  router.get('/:userId/userItems', async (req, res) => {
      try {
          const user = await User.findOne({
              where: { id: req.params.userId },
              include: [Item]
          })
          const gender = user.gender
          const id = []
          user.Items.forEach(i => id.push(i.id))
          const items = await Item.findAll({
              where: {
                  gender: gender,
                  id: { [Op.notIn]: id}
              }
          })
          res.send(items)
      } catch (err) { res.send(err) }
  })
  
  router.post('/:isLike/:ItemId/:UserId', async (req, res) => {
      try {
          const item = await UserItem.create(req.params)
          res.status(200).send(item)
      } catch (err) { res.status(400).send(err) }
  })



  router.post('/getAllUsers', async (req, res) => {
    try {
      let myUsers = User 
      .find()
      .then((response) => {
           console.log("get all users response:" + JSON.stringify(response));
      if (!response) {
        console.log("get all users response false:" + JSON.stringify(response));
          return res.status(404).json({
          message: 'data not found',
          });
      } 
      //return response;
      console.log("get all users response true:" + JSON.stringify(response));
      res.json(response);
      //res.write(response);
      });
    } catch (err) { res.status(400).send(err) }
  })

    /*
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);
    */
    app.use('/api/weights', router);
  };

