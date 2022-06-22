

module.exports = mongoose => {
    const userModel = mongoose.model(
      "userModel",
      mongoose.Schema(
        {
          email: String,
          password: String,
          name: String,
          phoneNumber: String
        },
        { timestamps: true }
      )
    );
    return userModel;
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