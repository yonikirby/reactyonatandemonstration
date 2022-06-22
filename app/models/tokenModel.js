/*const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: String,
            
    createdAt: {type: Date, default:Date.now, expires: 3600}
});

const tokenModel = mongoose.model('Token', tokenSchema);

module.exports = { tokenModel };
*/

module.exports = mongoose => {
    const tokenModel = mongoose.model(
      "tokenModel",
      mongoose.Schema(
        {
            email: String,
            token: String,
            
            createdAt: {type: Date, default:Date.now, expires: 3600}
            
            
        },
        { timestamps: true }
      )
    );
    return tokenModel;
  };
/*
  const dogsSchema = new mongoose.Schema({
    any: {}
});

const Dogs = mongoose.model('dogs', dogsSchema, 'dogs');


const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const userModel = mongoose.model('User', userModelSchema);

module.exports = { userModel };
 */ 
/*

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "userModel",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,// this is the expiry time in seconds
  },
});
module.exports = mongoose.model("tokenModel", tokenSchema);

*/