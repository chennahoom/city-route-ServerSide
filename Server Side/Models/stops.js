const { Schema, model } = require("mongoose");

const stopSchema = new Schema(
  {
    id: { type: Number },
    stop_region: { type: String },
    stop_name: { type: String },
    location_coords: { type: Array },
    is_ticket_needed: { type: String },
    discount_tickets_num: { type: Number },
  },
  { collection: "stops" }
);

const Stop = model("Stop", stopSchema);

module.exports = Stop;
