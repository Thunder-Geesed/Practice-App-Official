// imports
const express = require('express');
const mongoose = require('mongoose');
const userController = require('./userController.js');
const controller = require('./userController.js')
const path = require('path');
const app = express();
const PORT = 3000;

// connect to db
mongoose.connect('mongodb+srv://johnsaehwanlee:practiceapp@practice.ryl96ol.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to Database');
})

// global middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


// requests
// the ultimate final allpowerful line of code below (imgs, css, etc.)
app.use('', express.static('src'))

app.post('/createUser', userController.createUser, (req, res) => {
  return res.status(201).json(res.locals.newUser);
})

// req.param must match what key we look for in controller
app.get('/getUser/:username', userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.getUser);
})

app.patch('/setFavoriteItem', userController.setFavoriteItem, (req, res) => {
  return res.status(201).json(res.locals.update);
})

// req.param must match what key we look for in controller
app.delete('/deleteUser/:username', userController.deleteUser, (req, res) => {
    return res.status(202).json(res.locals.deletedUser)
})


// error handlers
app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


// start server
app.listen(PORT, ()=> {
    console.log(`Server listening on port: ${PORT}`)
})

module.exports = app;