const { Schema, model } = require("mongoose");

const addressSchema = new Schema(
  [
    {
      latitude: {type: Number},
      longitude: {type: Number},
    }
  ]
);

const stopSchema = new Schema(
  {
    id: { type: Number },
    stop_region: { type: String },
    stop_name: { type: String },
    location_coords: [addressSchema],
    is_ticket_needed: { type: String },
  },
  { collection: "stops" }
);

const Stop = model("Stop", stopSchema);

module.exports = Stop;
