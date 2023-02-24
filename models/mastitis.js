var mongoose = require('mongoose')

const mastitisShema = new mongoose.Schema({
    farm: {
      type: String,
      require: true
   },
   assay: {
      type: String,
      require: true
   },
   animalId: {
      type: String,
      require: true,
      unique: true
   },
   oneLob: {
      type: Number,
      require: true
   },
   twoLob: {
      type: Number,
      require: true
   },
   threeLob: {
      type: Number,
      require: true
   },
   fourLob: {
      type: Number,
      require: true
   },
   
});



const mastitis = mongoose.model('mastitis', mastitisShema);
module.exports = mastitis;
