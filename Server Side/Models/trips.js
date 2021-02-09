const { Schema, model } = require("mongoose");

const tripSchema = new Schema(
  {
    id: { type: Number },
    tour_guide_id: { type: Number },
    trip_name_city: { type: String },
    stops: {type : Array},
    tour_date: { type: String },
    tour_time: { type: String },
    start_time: { type: String },
    ticketsBought: { type: Number },
  },
  { collection: "trips" }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;
