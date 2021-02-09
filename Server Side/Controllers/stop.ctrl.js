const Stop = require("../Models/stops");

exports.stopController = {
  getStops(req, res) {
    const { city } = req.query;

    const filter = {};

    if (city) {
      filter.stop_region = city;
    }

    Stop.find(filter)
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },

  getStop(req, res) {
    Stop.findOne({ id: req.params.id })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => console.log(`Error getting the data from DB: ${err}`));
  },

  addStop(req, res) {
    const stop = new Stop();

    Stop.find({}).then((docs) => {
      const stopsLen = docs.length;

      stop.id = stopsLen + 1;
      stop.stop_region = req.body.stop_region;
      stop.stop_name = req.body.stop_name;
      stop.location_coords = req.body.location_coords;
      stop.is_ticket_needed = req.body.is_ticket_needed;

      stop
        .save()
        .then(() => res.json({ id: `${stop.id}` }))
        .catch((err) => console.log(err));
    });
  },

  updateStop(req, res) {
    const { body } = req;
    const stop = {};
    stop.id = req.params.id;

    if (body.stop_region) {
      stop.stop_region = body.stop_region;
    }
    if (body.stop_name) {
      stop.stop_name = body.stop_name;
    }
    if (body.location_coords) {
      stop.location_coords = body.location_coords;
    }
    if (body.is_ticket_needed) {
      stop.is_ticket_needed = body.is_ticket_needed;
    }

    const query = { id: req.params.id };

    Stop.updateOne(query, stop)
      .then(() => res.json({ id: `${req.params.id}` }))
      .catch((err) => console.log(err));
  },
  deleteStop(req, res) {
    Stop.deleteOne({ id: req.params.id })
      .then(() => res.json({ id: `${req.params.id}` }))
      .catch((err) => console.log(`Error deleting stop from db: ${err}`));
  },
};
