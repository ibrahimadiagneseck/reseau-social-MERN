const express = require('express');

const bodyParser = require('body-parser'); // req.body
const cookieParser = require('cookie-parser'); // req.cookies

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

require('dotenv').config({
    path: './config/.env'
});

require('./config/db');

const {checkUser, requireAuth} = require('./middleware/auth.middleware');
// const cors = require('cors');

const app = express();

// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   credentials: true,
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false
// }
// app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*', checkUser); // à n'importe quel route, verrifier si l'utilisateur a le token  
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// server : app.listen "en dernier place"
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})