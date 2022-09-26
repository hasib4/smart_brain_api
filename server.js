const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
    res.json('signin');
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('no such user');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('no such user');
    }
})


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
