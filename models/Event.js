const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let eventSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    startTime: {
      type: Date,
      required: true,
    },
    food: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    creatorId: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    responsibleId: {
      type: String,
      required: true,
    },
    interns: [{ internId: String }],
    participants: [{ participantId: String }],
  },
  { timestamps: true }
);

let Event = mongoose.model("event", eventSchema);

module.exports = Event;
