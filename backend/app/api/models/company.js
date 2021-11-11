const mongoose = require('mongoose');
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const Schema = mongoose.Schema;
//Define a schema
const ModelSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required."],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "firstName is required."],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  endDate: {
    type: Date,
    required: [true, "endDate is required."],
  }
});
ModelSchema.plugin(unique, { message: "That {PATH} is already taken." });
ModelSchema.plugin(autoIncrement.plugin, "Company");
module.exports = mongoose.model('Company', ModelSchema);
