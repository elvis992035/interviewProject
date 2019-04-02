const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

// this is what our data is going to look like in the database
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
          },
  password: {
    type: String,
    required: true
    },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  }

});

userSchema.plugin(uniqueValidator, {message: 'is already taken'});

module.exports = mongoose.model("User", userSchema);


