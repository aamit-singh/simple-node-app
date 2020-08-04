const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema(
  {
    name: String,
    topic: String,
    data: String,
  },
  { timestamp: true }
);

const DiaryEntry = mongoose.model("diaryEntry", diarySchema);
module.exports = DiaryEntry;
