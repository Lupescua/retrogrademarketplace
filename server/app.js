const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const port = (process.env.PORT || 8080);
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static('../client/build')); // Only needed when running build in production mode


/**** Database ****/
// The "Game System Data Access Layer".
const gameSystemDAL = require('./gameSystem_dal')(mongoose);

/**** Start ****/
const url = (process.env.MONGO_URL || 'mongodb://localhost/retrogamedb');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(async () => {
        // Fill in test data if needed.
        await gameSystemDAL.bootstrap();

        // Routes
        const gameSystemRouter = require('./gameSystem_router')(gameSystemDAL);
        app.use('/api/gamesystems', gameSystemRouter);
        // const userRouter = require('./user_router')(userDAL);
        // app.use('/api/users', userRouter);

        // "Redirect" all get requests (except for the routes specified above) to React's entry point (index.html)
        // It's important to specify this route as the very last one to prevent overriding all of the other routes
        app.get('*', (req, res) =>
            res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
        );

        await app.listen(port); // Start the API
        console.log(`Game API running on port ${port}!`)
    })
    .catch(error => console.error(error));



