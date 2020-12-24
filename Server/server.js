const express = require("express");
const app = express();
const port = process.env.PORT || 5050;
const { userRouter } = require("../server_side/Routers/user.router");
const { tripRouter } = require("../server_side/Routers/trip.router");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Content-Type', 'application/json');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRouter);
app.use('/api/trips', tripRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});

app.listen(port, () => console.log('Express server is running on port ', port));
