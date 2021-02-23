const Trip = require("../Models/trips");
const User = require("../Models/users");

exports.tripController = {
  getTrips(req, res) {
    if (Object.keys(req.query).length !== 0) {
      let query = {};

      Trip.find(query)
        .then((docs) => {
          res.json(docs);
        })
        .catch((err) => console.log(`Error getting the data from DB: ${err}`));
    }
    Trip.find({})
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },
  getTrip(req, res) {
    Trip.findOne({ id: req.params.id })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },

  addTrip(req, res) {
    const trip = new Trip();

    Trip.find({}).then((docs) => {

      trip.id = Date.now();
      trip.tour_guide_id = req.body.tour_guide_id;
      trip.trip_name_city = req.body.trip_name_city;
      trip.stops = req.body.stops;
      trip.tour_date = req.body.tour_date;
      trip.start_time = req.body.start_time;
      trip.tour_time = req.body.tour_time;
      trip.ticketsBought = req.body.ticketsBought;

      trip
        .save()
        .then(() => res.json({ id: `${trip.id}` }))
        .catch((err) => console.log(err));
    });
  },

  updateTrip(req, res) {
    const { body } = req;
    const trip = {};
    trip.id = req.params.id;

    if (body.tour_guide_id) {
      trip.tour_guide_id = body.tour_guide_id;
    }
    if (body.trip_name_city) {
      trip.trip_name_city = body.trip_name_city;
    }
    if (body.stops) {
      trip.stops = body.stops;
    }
    if (body.tour_date) {
      trip.tour_date = body.tour_date;
    }

    if (body.start_time) {
      trip.start_time = body.start_time;
    }

    if (body.tour_time) {
      trip.tour_time = body.tour_time;
    }

    if (body.ticketsBought) {
      trip.ticketsBought = body.ticketsBought;
    }

    const query = { id: req.params.id };

    Trip.updateOne(query, trip)
      .then(() => res.json({ id: `${req.params.id}` }))
      .catch((err) => console.log(err));
  },
  deleteTrip(req, res) {
    Trip.deleteOne({ id: req.params.id })
      .then(() => {
        User.updateOne(
          { id: req.body.id },
          { $pull: { my_trips: +req.params.id } }
        )
          .then((r) => {
            res.json({ id: `${req.params.id}` });
          })
          .catch((err) => console.log(`Error deleting trip from db: ${err}`));
      })
      .catch((err) => console.log(`Error deleting trip from db: ${err}`));
  },
};
