const { Router } = require('express');
const { tripController } = require('../Controllers/trip.ctrl');

const tripRouter = new Router();
module.exports = { tripRouter };

tripRouter.get('/', tripController.getTrips);
tripRouter.get('/:id', tripController.getTrip);
tripRouter.post('/', tripController.addTrip);
tripRouter.put('/:id', tripController.updateTrip);
tripRouter.delete('/:id', tripController.deleteTrip);

