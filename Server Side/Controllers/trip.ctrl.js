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
        const trip = new Trip();

        Trip.countDocuments({}, (err, result) => {
            if (err)
                console.log(err);
            else{
                trip.id = result+1;
            }
        }).then((result)=>{
            trip.tour_guide_id = body.tour_guide_id
            trip.trip_name_city = body.trip_name_city
            trip.tour_date = body.tour_date 
            trip.start_time = body.start_time   
            trip.tour_time = body.tour_time   
            trip.spaces_left = body.spaces_left
            trip.locations = body.locations
            trip.stops = body.stops

            
        
        trip.save()
            .then(() => res.json({id:`${trip.id}`}))
            .catch(err => console.log(err))
        })

    },
    updateTrip(req, res) {
        const { body } = req
        const trip = {};
        trip.id = req.params.id

        if (body.locations){
            trip.locations = body.locations
        }
        if(body.tour_guide_id){
            trip.tour_guide_id = body.tour_guide_id
        }
        if(body.trip_name_city){
            trip.trip_name_city = body.trip_name_city
        }
        if (body.tour_date){
            trip.tour_date = body.tour_date
        }

        if (body.start_time){
            trip.start_time = body.start_time
        }

        if (body.tour_time){
            trip.tour_time = body.tour_time
        }

        if (body.spaces_left){
            trip.spaces_left = body.spaces_left
        }

        if (body.stops){
            trip.stops = body.stops
        }

        const query = {id: req.params.id}

        Trip.updateOne(query, trip)
            .then(() => res.json({id:`${req.params.id}`}))
            .catch(err => console.log(err))

    },
    deleteTrip(req, res) {
        Trip.deleteOne({ id: req.params.id })
        .then(() => res.json({id:`${req.params.id}`}))
        .catch(err => console.log(`Error deleting trip from db: ${err}`));
    }
};
