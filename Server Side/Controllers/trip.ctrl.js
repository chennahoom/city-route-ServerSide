const Trip = require('../Models/trips');

exports.tripController = {
    getTrips(req, res) {
        if (Object.keys(req.query).length !== 0) {
            let query = {}

            Trip.find(query)
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
        Trip.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
    getTrip(req, res) {
        Trip.findOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },

    addTrip(req, res) {
        const { body } = req;
        const newTrip = new Trip(body);
        const result = newTrip.save();
        if (result) {
            res.json(newTrip)
        } else {
            res.status(404).send("Error saving a trip");
        }
    },
    updateTrip(req, res) {
        const { body } = req;
        Trip.updateOne({ id: req.params.id }, body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error updating trip from db: ${err}`));
    },
    deleteTrip(req, res) {
        Trip.deleteOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error deleting trip from db: ${err}`));
    }
};
