const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
});

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => { res.send('success') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) } )
app.put('/image', (req, res) => { image.handleImage(req, res, db) })


// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// });
// Load hash from your password DB.
// bcrypt.compare("icecream", '$2a$10$58IduNXXm/z60S1A3aM.6.2D.xyaen3b/f/aSrdkdCPiQDrNPRcfm', function(err, res) {
//     console.log('first guess', res)
// });
// bcrypt.compare("veggies", '$2a$10$58IduNXXm/z60S1A3aM.6.2D.xyaen3b/f/aSrdkdCPiQDrNPRcfm', function(err, res) {
//     console.log('second guess', res)
// });

app.listen(3001, () => {
    console.log('app is running on port 3001');
})
