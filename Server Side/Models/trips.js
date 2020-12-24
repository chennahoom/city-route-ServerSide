const { Schema, model } = require('mongoose');


const tripSchema = new Schema({
    id: { type: Number },
    tour_guide: { type: String },
    trip_name_city: { type: String },
    tour_date: { type: String },
    tour_time: { type: String },
    start_time: { type: String },
    spaces_left: { type: Number },

}, { collection: 'trips' });

const Trip = model('Trip', tripSchema);

module.exports = Trip;
