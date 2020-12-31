const { Schema, model } = require('mongoose');


const tripSchema = new Schema({
    id: { type: Number },
    tour_guide_id: { type: Number },
    trip_name_city: { type: String },
    tour_date: { type: String },
    tour_time: { type: String },
    start_time: { type: String },
    spaces_left: { type: Number },
    locations: { type: Array },
    stops: { type: String },

}, { collection: 'trips' });

const Trip = model('Trip', tripSchema);

module.exports = Trip;
