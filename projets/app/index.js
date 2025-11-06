const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv/config");

//Créer une constante qui indique le chemin de la route
const administratorRouter = require('./routes/administratorRoute');
const contributorRouter = require('./routes/contributorRoute');
const eventRouter = require('./routes/eventRoute');
const teamRouter = require('./routes/teamRoute');
const beachRouter = require('./routes/beachRoute')
const flashNewsRouter = require('./routes/flashNewsRoute')

const app = express();

app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: false }));


const corsOptions = {
  origin: 'https://www.vblc.fr',
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/administratorRoute', administratorRouter);
app.use('/contributorRoute', contributorRouter);
app.use('/eventRoute', eventRouter);
app.use('/teamRoute', teamRouter);
app.use('/beachRoute', beachRouter);
app.use('/flashNewsRoute', flashNewsRouter);

// Serve static files from the React frontend app
app.use(express.static('./frontend/build'));

// Workaround to avoid "404 error" for frontend routes.
['club', 'infoscription', 'teams', 'beach', 'events', 'partners', 'contact'].forEach(route => {
  app.get(`/${route}`, (req, res) => {
    res.sendFile('index.html', { root: './frontend/build' });
  });
});

cloudinary.config({
  secure: true
})

console.log(cloudinary.config())

dbOptions = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true
}

mongoose.connect(process.env.DB_URI)
  .then(() => console.log("DB Connected!"))
  .catch(err => console.log(err))

// mongoose.connect (process.env.DB_URI, dbOptions)
// .then(() => console.log("DB Connected!"))
// .catch(err => console.log(err))

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

