const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const userSchema = new Schema({  
  name: String,
  email: String,
  phone: String,
  password: String,
  create_date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('user', userSchema, 'users'); //collection name is users