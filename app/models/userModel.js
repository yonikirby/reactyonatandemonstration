//const { itemModel } = require("app/models/itemModel.js");
//const mongoose = require("mongoose");
const { Item } = require("./itemModel.js");
//const itemModel = require("./itemModel.js")(mongoose);






module.exports = mongoose => {

  const itemSchema = new mongoose.Schema(
    {
      title: String,
      description: String,
      color: String,
      clothingtype: String,
      size: mongoose.Decimal128 ,
      brand: String,
      gender: mongoose.Decimal128,//0 Male, 1 Female
      price: mongoose.Decimal128 ,
      image: String,
      url: String
  
    }
  );


    const userModel = mongoose.model(
      "userModel",
      mongoose.Schema(
        {
          name: String,
          gender: String,
          email: {
            type: String,
            unique: true // `email` must be unique
          },
          password: String,
          num_total_items_liked:mongoose.Decimal128,
          last_5_items_liked:[String],
          all_items_weights:[{
                clothingtype:String,//i.e. pants, bombers, tank tops
                totallikes:mongoose.Decimal128,
                color: [
                  {
                    colorname: String,
                    numoccurances: Number
                  }
                ],//total likes for each color under each color
                price: mongoose.Decimal128,
                size: mongoose.Decimal128,
                brand: [
                  {
                    brandname: String,
                    numoccurances: Number
                  }
                ],
                gender: Number,//0 male, 1 female
                lastfive: [String]
          }]
          
        }
       
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