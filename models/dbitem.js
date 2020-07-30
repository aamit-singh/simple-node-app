const { Mongoose, Schema } = require("mongoose");

const listSchema = new Schema(
  {
    name: String,
    count: Number,
    date: Date,
  },
  { timestamp: true }
);

const DbItem = Mongoose.model("DbItem", listSchema);
module.exports = DbItem;
