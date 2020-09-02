const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const Facility = require('./models/facility');
const User = require('./models/user');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://mean:A0XR1RiJSutQjOvo@cluster0.psjry.mongodb.net/node-angular?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
    console.log('Connection succeeded!');
})
.catch(() => {
    console.log('Connection failed!');s
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allows frontend and backend to run on different hosts
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");

    next();
});

//? Testing database connection
// app.get('/api/users', (req, res) => {
//     User.find()
//     .then((users) => {
//         res.status(200).json(users);
//     });
// });

//? Getting facilities
app.get('/api/facilities', (req, res) => {
    Facility.find()
    .then(document => {        
        res.status(200).json({
            message: 'Fetched facilities sucessfully',
            facilities: document
        });
    });
});

//? Posting to facilities
app.post('/api/facilities', (req, res, next) => {
    
    const facility = new Facility({
        name: req.body.name,
        seats: req.body.seats,
        isAvailable: req.body.isAvailable
    });
    
   facility.save()
   .then(addedFacility => {
       res.status(201).json({
           message: 'Facility added!',
           facility: {
               ...addedFacility,
               id: addedFacility._id
           }
       });
   });


});

//? Modifying Facility's availability
app.patch('/api/facilities/:id', (req, res) => {
    const id = req.params.id;
    const avail = req.body.availability;

    Facility.findByIdAndUpdate(id, { isAvailable: avail })
    .then(result => {
        res.status(200).json({
            message: 'Facility availability updated!'
        });
    });
});

//? Deleting facility by id
app.delete('/api/facilities/:id', (req, res) => {
    const id = req.params.id;

    Facility.deleteOne({ _id: id })
    .then(result => {
        res.status(200).json({
            message: 'Facility deleted!'
        });
    });
});

// *************************************************** //
// ******************** User Routes ****************** //
// *************************************************** //

//? Signup
app.post('/api/user/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });

        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User signup successful',
                result: result
            });
        });
    });
});

//? Login
app.post('/api/user/login', (req, res) => {
    let fetchedUser;

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: 'Authentication failed'
            });
        }

        fetchedUser = user;

        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result) {
            return res.status(401).json({
                message: 'Authentication failed'
            });
        }

        res.status(200).json({
            message: 'Authentication successful',
            userId: fetchedUser._id
        });
    });
});

module.exports = app;