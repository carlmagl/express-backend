const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let companySchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    creatorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let Company = mongoose.model("company", companySchema);

module.exports = Company;
