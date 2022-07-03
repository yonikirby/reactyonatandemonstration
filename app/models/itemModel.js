module.exports = mongoose => {


    const itemModel = mongoose.model(
      "Item",
      mongoose.Schema(
        {
          title: String,
          description: String,
          color: String,
          clothingtype: String,
          size: Number,
          brand: String,
          gender: Number,//0 Male, 1 Female
          price: Number,
          image: String,
          url: String
        }
       
      )
    );
    return itemModel;
  };

















/*
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    title: String,
    description: String,
    color: String,
    type: String,
    size: Number,
    brand: String,
    gender: Number,//0 Male, 1 Female
    price: Number,
    image: String,
    url: String

  }
);

const itemModel = mongoose.model('item', itemSchema);

module.exports = {
  itemModel
}
*/








