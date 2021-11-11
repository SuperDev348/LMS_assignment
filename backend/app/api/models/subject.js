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
});
ModelSchema.plugin(unique, { message: "That {PATH} is already taken." });
ModelSchema.plugin(autoIncrement.plugin, "Subject");
module.exports = mongoose.model('Subject', ModelSchema);
