const axios = require('axios');
const { json } = require('express/lib/response');
var FormData = require('form-data');
//const fs = require('fs');
//const http = require('http');
//const fetch =  require('node-fetch');
//const { getStorage, ref, getDownloadURL } =  require("firebase/storage");
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var FileReader = require('filereader')
//const { initializeApp } =  require("firebase/app");
//const { getAnalytics } =  require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
/*
const crypto = require("crypto")

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


const reader = new FileReader();

/*
const getAllUsers = async () => {
  try {
      const try1 = await 
      axios.post('https://calm-stream-62617.herokuapp.com/api/memories/getAllUsers', {
          headers: {
              'Content-Type': 'application/json'
            } 
      })
      .then(function (response) {
        console.log("axios getallusers success: " + JSON.stringify(response.data));
        
      
      })
      .catch(function (error) {
        if (error.response) {
          console.log("getAllUsers fail: " + error.response.data.message);
          
        }
      });
      
  }
  catch (e) {
    console.log(e);    
  }
}

getAllUsers();

  const myValidate = JSON.stringify({ email: 'yonikirby@gmail.com',
  password: '1235' });
  
 
  const validateUser = async () => {
    try {
        const try2 = await 
        axios.post('https://calm-stream-62617.herokuapp.com/api/memories/validateUser', myValidate, {
            headers: {
                'Content-Type': 'application/json'
              } 
  })
  .then(function (response) {
    console.log("axios validateuser success: " + JSON.stringify(response.data.message));
   
  })
  .catch(function (error) {
    if (error.response) {
      console.log("axios validateuser fail: " + error.response.data.message);
     
    }
  });
        
    }
    catch (e) {
      console.log(e);    
    }
 }

 validateUser();


 const deleteAllUsers = async () => {
  try {
      const submitQuestions = await 
      axios.post('https://calm-stream-62617.herokuapp.com/api/memories/deleteAllUsers', {
          headers: {
              'Content-Type': 'application/json'
            } 
})
.then(function (response) {
  console.log("axios deleteAllUsers success: " + JSON.stringify(response.data.message));
 
})
.catch(function (error) {
  if (error.response) {
    console.log("deleteAllUsers message: " + error.response.data.message);
    //console.log(error.response.status);
    //console.log(error.response.headers);
  }
});
      
  }
  catch (e) {
    console.log(e);    
  }
}

//deleteAllUsers();


const deleteAllMemories = async () => {
  try {
      const submitQuestions = await 
      axios.post('https://calm-stream-62617.herokuapp.com/api/memories/deleteAllMemories', {
          headers: {
              'Content-Type': 'application/json'
            } 
})
.then(function (response) {
  console.log("axios deleteAllMemories success: " + JSON.stringify(response.data.message));
 
})
.catch(function (error) {
  if (error.response) {
    console.log("deleteAllMemories message: " + error.response.data.message);
    //console.log(error.response.status);
    //console.log(error.response.headers);
  }
});
      
  }
  catch (e) {
    console.log(e);    
  }
}

//deleteAllMemories();

/*
const deleteAllTokens = async () => {
  try {
      const submitQuestions = await 
      axios.post('https://calm-stream-62617.herokuapp.com/api/memories/deleteAllTokens', {
          headers: {
              'Content-Type': 'application/json'
            } 
})
.then(function (response) {
  console.log("axios deleteAllTokens success: " + JSON.stringify(response.data.message));
 
})
.catch(function (error) {
  if (error.response) {
    console.log("deleteAllTokens message: " + error.response.data.message);
    //console.log(error.response.status);
    //console.log(error.response.headers);
  }
});
      
  }
  catch (e) {
    console.log(e);    
  }
}

deleteAllTokens();
*/
/*
const myAddJSON = JSON.stringify({ email: 'yonikirby@gmail.com',
  password: '1234', name: "John Smith", phonenumber: "1234567890" });
  

  const addUser = async () => {
    try {
        const try3 = await 
        axios.post('https://calm-stream-62617.herokuapp.com/api/memories/addUser', myAddJSON, {
            headers: {
                'Content-Type': 'application/json'
              } 
  })
  .then(function (response) {
    console.log("axios add user success: " + JSON.stringify(response.data.message));
   
  })
  .catch(function (error) {
    if (error.response) {
      console.log("axios add user fail: " + error.response.data.message);
   
    }
  });
        
    }
    catch (e) {
      console.log(e);    
    }
 }

 addUser();


  /*const file = new File([blob], 'mountains.jpg', {type: blob.type});



 let idCardBase64 = '';
getBase64(file, (result) => {
      idCardBase64 = result;
 });
 
 function getBase64(file, cb) {
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function () {
         cb(reader.result)
     };
     reader.onerror = function (error) {
         console.log('Error: ', error);
     };
 }
//fileBase64: fs.readFileSync('mountains.jpg', {encoding: 'base64'})
*/
/*
const myAddJSON3 = JSON.stringify({ email: 'yonikirby@gmail.com',
date: Date.now(), relation: "cousin",
 tips: "אחרי שהישיבה על הסכם השכר בין הסתדרות המורים לאנשי האוצר אמש התפוצצה, הודיעה יפה בן דויד על החרפת הצעדים: ",
location: "Brazil",
fileBase64: fs.readFileSync('mountains.jpg', {encoding: 'base64'}),
memoryowner: "Yoni Kirby"
});
    
  const addMemory = async() => { 
    try {
    await axios.post('https://calm-stream-62617.herokuapp.com/api/memories/saveOneMemory', myAddJSON3, {
      headers: {
        'Content-Type': 'application/json'
      } 
  })
  .then(function (response) {
    console.log("axios saveonememory success: " + JSON.stringify(response.data) );
   
  })
  .catch(function (error) {
    if (error.response) {
      console.log("axios add memory fail: " + error.response.data.message);
   
    }
  });
}
catch (e) {
  console.log(e);    
}
}
 
addMemory();

 


const myUserInfo = JSON.stringify({ email: 'yonikirby@gmail.com' });

const getAllMemoriesOfOneUser = async() => { 
  try {
  await axios.post('https://calm-stream-62617.herokuapp.com/api/memories/getAllMemoriesOfOneUser', myUserInfo, {
    headers: {
      'Content-Type': 'application/json'
    } 
})
.then(function (response) {
  console.log("axios getallmemories of one user success: " + JSON.stringify(response.data) );
 
    //set image url as response[i].imageURL
})
.catch(function (error) {
  if (error.response) {
    console.log("axios getallmemories of one user fail: " + error.response.data.message);
  
  }
});
}
catch (e) {
console.log(e);    
}
}
//returns "data not found" for length 0 in console
getAllMemoriesOfOneUser(); 





const myAddJSON4 = JSON.stringify({ email: 'yonikirby@gmail.com'});
    
  const forgotPassword = async() => { 
    try {
    await axios.post('https://calm-stream-62617.herokuapp.com/api/memories/forgotPassword', myAddJSON4, {
      headers: {
        'Content-Type': 'application/json'
      } 
  })
  .then(function (response) {
    console.log("axios forgotpassword success: " + JSON.stringify(response.data) );
   
  })
  .catch(function (error) {
    if (error.response) {
      console.log("axios forgotpassword fail: " + error.response.data.message);
      
    }
  });
}
catch (e) {
  console.log(e);    
}
}
 
//forgotPassword();




const getAllTokens = async () => {
  try {
      const try1 = await 
      axios.post('https://calm-stream-62617.herokuapp.com/api/memories/getAllTokens', {
          headers: {
              'Content-Type': 'application/json'
            } 
      })
      .then(function (response) {
        console.log("axios getalltokens success: " + JSON.stringify(response.data));
        
      
      })
      .catch(function (error) {
        if (error.response) {
          console.log("getAlltokens fail: " + error.response.data.message);
          
        }
      });
      
  }
  catch (e) {
    console.log(e);    
  }
}

//getAllTokens();


const doThis = async () =>{
  await hash("12")
  .then((result) => {
    console.log("hash of 12:" + result)
  }



  )
}
//doThis();


//fs = require('fs');
fs.writeFile('raayaoutput.txt', fs.readFileSync('mountains.jpg', {encoding: 'base64'}), function (err) {
  if (err) return console.log(err);
  //console.log('Hello World > helloworld.txt');
});





const myAddJSON13 = JSON.stringify({ memoryid: "62b369a3a1396fdcbeb03555", 
imageurl: "https://firebasestorage.googleapis.com/v0/b/memoriesimagestorage.appspot.com/o/memorypictureuploads%2F62aca94dc6a038b0f700a14b%2FmyImage.txt?alt=media&token=01b0b45d-7d6d-4d82-a7c7-eabb48e5e431", email: 'yonikirby@gmail.com',
date: Date.now(), relation: "cousin",
 tips: "אחרי שהישיבה על הסכם השכר בין הסתדרות המורים לאנשי האוצר אמש התפוצצה, הודיעה יפה בן דויד על החרפת הצעדים: ",
location: "Tunisia",
fileBase64: fs.readFileSync('forest.jpg', {encoding: 'base64'}),
memoryowner: "Yoni Kirby"
});
    
  const updateMemory = async() => { 
    try {
    await axios.post('https://calm-stream-62617.herokuapp.com/api/memories/updateOneMemory', myAddJSON13, {
      headers: {
        'Content-Type': 'application/json'
      } 
  })
  .then(function (response) {
    console.log("axios updateMemory success: " + JSON.stringify(response.data) );
   
  })
  .catch(function (error) {
    if (error.response) {
      console.log("axios update memory fail: " + error.response.data.message);
   
    }
  });
}
catch (e) {
  console.log(e);    
}
}
 
//updateMemory();

var myID = JSON.stringify({memoryid: "62b369a3a1396fdcbeb03555"})

const deleteOneMemory = async () => {
  try {
      const submitQuestions = await 
      axios.post('https://calm-stream-62617.herokuapp.com/api/memories/deleteOneMemory', myID, {
          headers: {
              'Content-Type': 'application/json'
            } 
})
.then(function (response) {
  console.log("axios deleteAllMemories success: " + JSON.stringify(response.data.message));
 
})
.catch(function (error) {
  if (error.response) {
    console.log("deleteAllMemories message: " + error.response.data.message);
    //console.log(error.response.status);
    //console.log(error.response.headers);
  }
});
      
  }
  catch (e) {
    console.log(e);    
  }
}

//deleteOneMemory();
*/



const myAddJSON = JSON.stringify({ email: 'yonikirby@hotmail.com',
  password: '1234', name: "John Smith", gender: "male" });
  

  const addUser = async () => {
    try {
        const try3 = await 
        axios.post('https://yonatanweightsapp.herokuapp.com/api/weights/user', myAddJSON, {
            headers: {
                'Content-Type': 'application/json'
              } 
  })
  .then(function (response) {
    console.log("axios add user success: " + JSON.stringify(response.data.message));
   
  })
  .catch(function (error) {
    if (error.response) {
      console.log("axios add user fail: " + error.response.data.message);
   
    }
  });
        
    }
    catch (e) {
      console.log(e);    
    }
 }

 //addUser();



 const addItem = async (myJSON) => {
  try {
      const try1 = await 
      axios.post('https://yonatanweightsapp.herokuapp.com/api/weights/userlikesitem', myJSON, {
          headers: {
              'Content-Type': 'application/json'
            } 
      })
      .then(function (response) {
        console.log("axios additem success: " + JSON.stringify(response.data));
        
      
      })
      .catch(function (error) {
        if (error.response) {
          console.log("additem fail: " + error.response.data.message);
          
        }
      });
      
  }
  catch (e) {
    console.log(e);    
  }
}
 
var myJSON = [{email: 'yonikirby@hotmail.com', clothingtype: 'jeans', color: 'red', brand: 'Gap', gender: 0, size:36,
title: 'excellent blue jeans', description: 'great fit! use whenever', price: 35, url: 'google.com', image: ""},
{email: 'yonikirby@yahoo.com', clothingtype: 'hat', color: 'black', brand: 'hollister', gender: 0, size:30,
title: 'excellent t-shirt', description: 'great fit! use whenever you want', price: 45, url: 'google.com', image: ""},
{email: 'yonikirby@yahoo.com', clothingtype: 'hat', color: 'white', brand: 'abercrombie', gender: 0, size:26,
title: 'excellent polo shirt', description: 'very nice!', price: 60, url: 'google.com', image: ""}
];
 

for (var i in myJSON){
  //addItem(JSON.stringify(myJSON[i]));
} 



 const getAllUsers = async () => {
  try {
      const try1 = await 
      axios.post('https://yonatanweightsapp.herokuapp.com/api/weights/getallusers', {
          headers: {
              'Content-Type': 'application/json'
            } 
      })
      .then(function (response) {
        console.log("axios getallusers success: " + JSON.stringify(response.data));
        
      
      })
      .catch(function (error) {
        if (error.response) {
          console.log("getAllUsers fail: " + error.response.data.message);
          
        }
      });
      
  }
  catch (e) {
    console.log(e);    
  }
}

getAllUsers();

const getAllItems = async () => {
  try {
      const try1 = await 
      axios.post('https://yonatanweightsapp.herokuapp.com/api/weights/getallitems', {
          headers: {
              'Content-Type': 'application/json'
            } 
      })
      .then(function (response) {
        console.log("axios getallitems success: " + JSON.stringify(response.data));
        
      
      })
      .catch(function (error) {
        if (error.response) {
          console.log("getAllItems fail: " + error.response.data.message);
          
        }
      });
      
  }
  catch (e) {
    console.log(e);    
  }
}

getAllItems();


const deleteAllUsers = async () => {
  try {
      const try1 = await 
      axios.post('https://yonatanweightsapp.herokuapp.com/api/weights/deleteallusers', {
          headers: {
              'Content-Type': 'application/json'
            } 
      })
      .then(function (response) {
        console.log("axios deleteallusers success: " + JSON.stringify(response.data));
        
      
      })
      .catch(function (error) {
        if (error.response) {
          console.log("deleteallusers fail: " + error.response.data.message);
          
        }
      });
      
  }
  catch (e) {
    console.log(e);    
  }
}

//deleteAllUsers();



const deleteAllItems = async () => {
  try {
      const try1 = await 
      axios.post('https://yonatanweightsapp.herokuapp.com/api/weights/deleteallitems', {
          headers: {
              'Content-Type': 'application/json'
            } 
      })
      .then(function (response) {
        console.log("axios deleteallusers success: " + JSON.stringify(response.data));
        
      
      })
      .catch(function (error) {
        if (error.response) {
          console.log("deleteallusers fail: " + error.response.data.message);
          
        }
      });
      
  }
  catch (e) {
    console.log(e);    
  }
}

//deleteAllItems();