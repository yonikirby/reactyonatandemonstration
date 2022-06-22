const db = require("../models");
const memoryModel = db.memoryModel;
const userModel = db.userModel;
const tokenModel = db.tokenModel;
const path = require('path');
const fs = require('fs');

const {MessageClient} = require('cloudmailin')

require('dotenv').config()
console.log("my process env: " + process.env) 

var nodemailer = require('nodemailer');
const crypto = require("crypto")


const JWT = require("jsonwebtoken");
const sendEmail = require("../utils/email/sendEmail");

const { getStorage, ref, getDownloadURL } =  require("firebase/storage");


async function hash(password) {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'))
        });
    })
}

async function verify(password, hash) {
  return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":")
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
          if (err) reject(err);
          resolve(key == derivedKey.toString('hex'))
      });
  })
}
/*
function verifyPassword(password, salt, key){
  return crypto.scryptSync(password, salt, 64).equals(key);
}
*/
exports.addUser = (req, res) => {
    // Validate request
    console.log("in add: " + req.body.email)
    const doThis = async(req, res) => {
        console.log("models: " + userModel + memoryModel)
        
        if (!req.body.email) {
            res.status(400).send({ message: "Email can not be empty!" });
            return;
          }
        if (!req.body.password) {
          res.status(400).send({ message: "Password can not be empty!" });
          return;
        }
        if (!req.body.name) {
          res.status(400).send({ message: "Name can not be empty!" });
          return;
        }

        var myEmail = req.body.email;
        console.log("myEmail: " + myEmail)


    // Using the factory defaults.
    //scrypt(req.body.password, '*#&$(FFG', 64, (err, hash) => {
      //const key = crypto.scryptSync(req.body.password, '*#&$(FFG', 64);
    var myHash = await hash(req.body.password);

      //console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'


        //bcrypt.hash(req.body.password, 10, function(err, hash) {//salt and hash password
            
                    let myExistingUser = userModel
                    .find({email:myEmail})
                    .then((response) => {
                          console.log("add response: " + JSON.stringify(response))
                          if (response.length == 0) {
                                    // Store hash in the database
                                    const user = new userModel({
                                      email: req.body.email,
                                      password: myHash,
                                      name: req.body.name,
                                      phoneNumber: req.body.phonenumber
                                    });
                                    
                                    user
                                      .save()
                                      .then(data => {
                                          res.status(200).send({
                                              message: "User created successfully."
                                                
                                          });
                                      })
                                      .catch(err => {
                                        res.status(500).send({
                                          message:
                                            "Some error occurred while creating the User."
                                        });
                                      });
                          }
                          else {
                            res.status(500).send({
                              message:
                                "User email already exists."
                            });
                          }
                      
                      

                    });



                
            //});
              };
              doThis(req,res);

  };



  exports.getAllMemoriesOfOneUser = (req, res) => {
    // Validate request
    
    if (!req.body.email) {
        res.status(400).send({ message: "Email can not be empty!" });
        return;
      }
    
    let myEmail = req.body.email;


    let myMemories = memoryModel
    .find({owneremail: myEmail})
    .sort({lastupdated: -1})//most recent first
    .then((response) => {
        
    if (response.length == 0) {
        return res.status(404).json({
        message: 'Data not found.',
        });
    }
    res.json(response);
  })
  }




  exports.validateUser = (req, res) => {
    // Validate request
    console.log("req: " + JSON.stringify(req.body))
    console.log("req.data: " + req.body.email)
    if (!req.body.email) {
        res.status(400).send({ message: "Email can not be empty!" });
        return;
      }
    //check if email exists
    
        let myUsers = userModel
        .find({email:req.body.email})
        .limit(1)
        .then((response) => {
          console.log("validate response:" + JSON.stringify(response))
          if (response.length == 0) {
            return res.status(404).json({
              message: 'Email does not exist',
            });
          }
          const doThis = async(inputtedPassword, hash) => {
          console.log("in verify:" + JSON.stringify(response))

          console.log("two passwords: " + inputtedPassword + ":" + hash)

          var verifyresponse = await verify(inputtedPassword, hash);
          //bcrypt.compare(req.body.password, response[0].password, function(err, response) {
            console.log("bcrypt result: " + verifyresponse)
            
            if (verifyresponse == true) {
               // password is valid
               return res.status(200).json({
                    message: 'User password accepted.',
              });
            }
              else {
                    return res.status(404).json({
                    message: 'Password does not match input.',
                  });
              }
            } 
            doThis(req.body.password, response[0].password)
          //});

        });
      
  }

  exports.saveOneMemory = (req, res) => {
  

    //console.log("savethis: " + JSON.stringify(req.body));
    if (!req.body.email) {
      res.status(400).send({ message: "Email can not be empty!" });
      return;
    }
    
    var myEmail = req.body.email;


let myImageBase64 = req.body.fileBase64;
//let myImageFileName = req.body.originalFilename;//req.body.image;
let myLocation = req.body.location;
let myDate = req.body.date;
let myRelation = req.body.relation;
let myTips = req.body.tips;
let myMemoryOwner = req.body.memoryowner;

//let myEmail = req.body.email;

//var string = req.body.image;//"data:image/png;base64,long-String"
//var bindata = new Buffer(string.split(",")[1],"base64");

var myMemory = new memoryModel({
    location: myLocation,
    date: myDate,
    relation: myRelation,
    owneremail: myEmail,
    tips: myTips,
    imageURL: "",
    memoryowner: myMemoryOwner
    
});
  
  myMemory.save().then((resp) => {
    
    console.log("my response: ")


    var dir = 'memorypictureuploads/' + resp._id + '/';
    
    try {

      const { getStorage, ref, getDownloadURL, uploadString} =  require("firebase/storage");

    //var storageRef = firebase.storage.ref(dir + myImageFileName);



/*
    var fileToUpload; 

    urltoFile(myImageBase64, myImageFileName,'text/plain')
    .then(function(file){ 
      fileToUpload = file;

    });*/


    const storage = getStorage();
    const storageRef = ref(storage, dir + "myImage.txt");
    // Base64 formatted string
    const message= myImageBase64; 
    console.log("String base64: " + message.substring(0,15))
    uploadString(storageRef, message, 'base64').then((snapshot) => {
      console.log('Uploaded a base64 string!');
      //console.log("my snapshot:" + JSON.stringify(snapshot))

            const imageRef = ref(storage, 'memorypictureuploads/' + resp._id + '/myImage.txt');
    
    
            getDownloadURL(imageRef)
            .then((url) => {
              console.log ("my final url: " + url)
              resp.imageURL = url;
              resp.save();
              //console.log("response[i]: " + JSON.stringify(response[i]))
              //response[i].imageURL = url;
              //console.log("response[i] updated: " + JSON.stringify(response[i]))
              //if (i == response.length - 1){   
              //  res.json(response);
              //}
              // Insert url into an <img> tag to "download"
            })
            
            .catch((error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/object-not-found':
                  console.log("file doesn't exist")
                  // File doesn't exist
                  break;
                case 'storage/unauthorized':
                  console.log("user unauthorized")
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  console.log("user cancelled the upload")
                  // User canceled the upload
                  break;
          
                // ...
          
                case 'storage/unknown':
                  console.log("unknown storage error")
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
    });


    //uploadTask = firebase.storage().ref(dir).child('myImage.jpg').putString(myImageBase64, 'base64', {contentType:'image/jpg'});
    

    

    //document.getElementById("fileUpload");
    
    //fileUpload.on('change', function(evt) {
    
      //var firstFile = evt.target.file[0]; 
    
      //var uploadTask = storageRef.put(firstFile);
      //storageRef.child(dir + myImageFileName).put(fileToUpload);
    //})


    /*uploadTask.on('state_changed', function progress(snapshot) {

      console.log(snapshot.totalBytesTransferred); 
 
   });*/
    

      /*
    require("fs").writeFile(newPath, base64Data, 'base64', function(err) {
      console.log(err);
    });
*/
    res.status(200).send({
      message: "Memory created successfully."
        
  });
}
catch (e) {
  console.log("file write error:" + e);
  res.status(500).send({
    message:
      "Memory Created, but some error occurred while uploading the image."
  });
  }

})


console.log("listing firebase files: ")
const { getStorage, ref, listAll } =  require("firebase/storage");

const storage = getStorage();

// Create a reference under which you want to list
const listRef = ref(storage, 'files/uid');

// Find all the prefixes and items.
listAll(listRef)
.then((res) => {
res.prefixes.forEach((folderRef) => {
// All the prefixes under listRef.
// You may call listAll() recursively on them.
});
res.items.forEach((itemRef) => {
// All the items under listRef.
});
}).catch((error) => {
// Uh-oh, an error occurred!
});


}

exports.updateOneMemory = (req, res) => {
  

  //console.log("savethis: " + JSON.stringify(req.body));
  if (!req.body.memoryid) {
    res.status(400).send({ message: "memoryid can not be empty!" });
    return;
  }
  
  var myEmail = req.body.email;

let myMemoryID = req.body.memoryid;
let myImageBase64 = req.body.fileBase64;
//let myImageFileName = req.body.originalFilename;//req.body.image;
let myLocation = req.body.location;
let myDate = req.body.date;
let myRelation = req.body.relation;
let myTips = req.body.tips;
let myMemoryOwner = req.body.memoryowner;
let myImageFileURL = req.body.imageurl;
//let myEmail = req.body.email;

//var string = req.body.image;//"data:image/png;base64,long-String"
//var bindata = new Buffer(string.split(",")[1],"base64");

/*var myMemory = new memoryModel({
  location: myLocation,
  date: myDate,
  relation: myRelation,
  owneremail: myEmail,
  tips: myTips,
  imageURL: "",
  memoryowner: myMemoryOwner
  
});*/

let myMemory = memoryModel 
    .find({_id: myMemoryID})
    .then((response) => {
        response[0].email = myEmail;
        response[0].fileBase64 = myImageBase64;
        response[0].location = myLocation;
        response[0].date = myDate;
        response[0].relation = myRelation;
        response[0].tips = myTips;
        response[0].memoryowner = myMemoryOwner;
        response[0].save().then((resp) => {
  
        
        
          var dir = 'memorypictureuploads/' + myMemoryID + '/';
          
          try {
        
            const { getStorage, ref, getDownloadURL, uploadString} =  require("firebase/storage");
        
          
            //const storage = getStorage();

            // Create a reference to the file to delete
            /*var fileRef = storage.refFromURL(myImageFileURL);
              
            console.log("File in database before delete exists : " 
                    + fileRef.exists())
              */
            // Delete the file using the delete() method 
            //fileRef.delete().then(function () {
              
                // File deleted successfully
                //console.log("File Deleted")
                
        
              const storage = getStorage();
          const storageRef = ref(storage, dir + "myImage.txt");
          // Base64 formatted string
          const message= myImageBase64; 
          console.log("String base64: " + message.substring(0,15))
          uploadString(storageRef, message, 'base64').then((snapshot) => {
            console.log('Uploaded a base64 string!');
            //console.log("my snapshot:" + JSON.stringify(snapshot))
        
                  const imageRef = ref(storage, 'memorypictureuploads/' + resp._id + '/myImage.txt');
          
          
                  getDownloadURL(imageRef)
                  .then((url) => {
                    console.log ("my final url: " + url)
                    resp.imageURL = url;
                    resp.save();
                    
                  })
                  
                  .catch((error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                      case 'storage/object-not-found':
                        console.log("file doesn't exist")
                        // File doesn't exist
                        break;
                      case 'storage/unauthorized':
                        console.log("user unauthorized")
                        // User doesn't have permission to access the object
                        break;
                      case 'storage/canceled':
                        console.log("user cancelled the upload")
                        // User canceled the upload
                        break;
                
                      // ...
                
                      case 'storage/unknown':
                        console.log("unknown storage error")
                        // Unknown error occurred, inspect the server response
                        break;
                    }
                  });
          });
        
        
          //uploadTask = firebase.storage().ref(dir).child('myImage.jpg').putString(myImageBase64, 'base64', {contentType:'image/jpg'});
          
        
          
          res.status(200).send({
            message: "Memory updated successfully."
              
        });

            /*}).catch(function (error) {
                // Some Error occurred
            });*/



        }
        catch (e) {
        console.log("file write error:" + e);
        res.status(500).send({
          message:
            "Memory Updated, but some error occurred while uploading the image."
        });
        }
        
        })
    })
    
    .catch(err => {
      res.status(500).send(
        err
      );
    });
  






}

  exports.getAllUsers = (req, res) => {
    // Validate request
    
    console.log("in get all users function")

    let myUsers = userModel 
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
  }


  exports.getAllTokens = (req, res) => {
    // Validate request
    
    console.log("in get all tokens function")

    let myTokens = tokenModel 
    .find()
    .then((response) => {
         console.log("get all tokens response:" + JSON.stringify(response));
    if (!response) {
      console.log("get all tokens response false:" + JSON.stringify(response));
        return res.status(404).json({
        message: 'data not found',
        });
    } 
    //return response;
    console.log("get all tokens response true:" + JSON.stringify(response));
    res.json(response);
    //res.write(response);
    });
  }


  exports.deleteAllUsers = (req, res) => {
    // Validate request
    
    let myUsers = userModel 
    .find({})
    .remove().exec().then((response) => {
      res.json("All users deleted.");
    })
    
    .catch(err => {
      res.status(500).send(
        err
      );
    });
  }

  exports.deleteAllMemories = (req, res) => {
    // Validate request
    
    

    let myMemories = memoryModel 
    .find({})
    .remove().exec().then((response) => {
      res.json("All memories deleted.");
    })
    
    .catch(err => {
      res.status(500).send(
        err
      );
    });
  
    }

    exports.deleteOneMemory = (req, res) => {
      // Validate request
      
      
  
      let myMemories = memoryModel 
      .find({_id: req.body.memoryid})
      .remove().exec().then((response) => {
        res.json("Memory deleted.");
      })
      
      .catch(err => {
        res.status(500).send(
          err
        );
      });
    
      }

  exports.deleteAllTokens = (req, res) => {
    // Validate request
    
    

    let myTokens = tokenModel 
    .find({})
    .remove().exec()

  }

  exports.forgotPassword = (req, res) => {
    // Validate request
    const doThis = async (req, res) => {

            console.log("myEmail: " + req.body.email);

            var toFind = req.body.email;

            const user = userModel.find({email: toFind })

            .then((response) => {

            console.log("myUser:" + response + JSON.stringify(response[0]))

            if (response.length == 0) { 
              return res.status(404).json({
                message: 'Email does not exist.',
                });
            }
            var toFind = response[0].email;
            //var toFind = (response[0]._id).toString();
            //console.log ("toFind: " + toFind.toString());
            //toFind = toFind.toString();
            
            tokenModel.find({email: toFind})
            .then((token) => {
                  if (token.length > 0) { 
                      token[0].deleteOne();
                  };
      
                  let resetToken = crypto.randomBytes(32).toString("hex");

                  const doThis2 = async () => {
                    await hash(resetToken)
                  .then((hash)=> {
 
                    console.log("got into this little part")
                          new tokenModel({
                            email: response[0].email,
                            token: hash,
                            createdAt: Date.now(),
                          }).save();
                        
                          var clientURL = "https://calm-stream-62617.herokuapp.com";
                          const link = `${clientURL}/passwordreset.html?token=${resetToken}&email=${response[0].email}`;
                          



                          const sgMail = require('@sendgrid/mail')
                            sgMail.setApiKey("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")
                            const msg = {
                              "to": response[0].email, // Change to your recipient
                              "from": 'zichronotbeitberl@gmail.com', // Change to your verified sender
                              "subject": 'Forgot Password Link',
                              "html": 'Hello, please reset your password by clicking on this link:<a href = "'
                              + link + '">' + link + '</a>. Thank you, <br />The Zichronot Beit Berl Team'
                            }
                            sgMail
                              .send(msg)
                              .then(() => {
                                console.log('Email sent')
                                return res.status(200).json("Password reset link sent.");
                              })
                              .catch((error) => {
                                console.error(error)
                                return res.status(500).json("Error sending password reset link.");
                              })
                         
                        });




                  }
                  doThis2();

                });
          });
          }
        doThis(req, res);
  }


  exports.forgotPasswordVerify = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    let token = req.body.token;
    console.log("req body email: " + req.body.email)
    console.log("req: " + JSON.stringify(req.body))
    const doThis = async (req, res, email, password, token) => {

          var myPasswordResetToken;
          let passwordResetToken = await tokenModel.find({ email: email })
          .then((passwordResetToken) => {
            myPasswordResetToken = passwordResetToken;
                if (passwordResetToken.length == 0) {

                  return res.status(404).json({
                    message: 'Invalid or expired password reset token',
                    });
                  
                }
                console.log("response: " + JSON.stringify(passwordResetToken))
                const doThis3 = async () => {
                const isValid = await verify(token, passwordResetToken[0].token)
                .then((result) => {
                if (!result) {
                  return res.status(404).json({
                    message: 'Invalid or expired password reset token',
                    });
                }
                const doThis = async()=>{
                const myhash = await hash(password);
                //.then((hash) => {
                  console.log("resulting hash: " + hash)
                await userModel.update(
                  { email: email },
                  { $set: { password: myhash } },
                  { new: true }
                ).then ((updated) =>{
                const user = userModel.find({  email:email })
                .then((user) => {
                
                tokenModel.deleteOne({email: email})
                .then((response) => {
                  
                  const sgMail = require('@sendgrid/mail')
                            sgMail.setApiKey("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")
                            const msg = {
                              "to": email, // Change to your recipient
                              "from": 'zichronotbeitberl@gmail.com', // Change to your verified sender
                              "subject": 'Forgot Password Reset Confirmation',
                              "html": 'Hello, <br /> Thank you for resetting your password. Sincerely, '
                              + '<br />The Zichronot Beit Berl Team'
                            }
                            sgMail
                              .send(msg)
                              .then(() => {
                                console.log('Email sent')
                                return res.status(200).json("Password reset successfully!");
                              })
                              .catch((error) => {
                                console.error(error)
                                return res.status(500).json("Error sending password reset confirmation email.");
                              })
                })
                .catch(err => {
                  res.status(500).send({
                    message:
                      "Some error occurred while deleting the token." + err
                  });
                });
                //;
                
                })
              })
            }
            doThis();
              })
            }//end doThis3
            doThis3();
            })//end .then
      }
      doThis(req, res, email, password, token);
  }

 