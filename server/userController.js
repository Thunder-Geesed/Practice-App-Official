const { findOneAndUpdate } = require('./userModel');
const User = require('./userModel')

const userController = {
  async createUser(req, res, next) {
    // deconstruct data and check for invalid inputs
    const { username, password } = req.body;
    if(!username || !password) {
      return next({
        log: 'Error in userController.createUser',
        status: 400,
        message: {err: 'Please fill out all fields'}
      });
    }
    // create a new user in the data base
    try{
        const result = await User.create({ username: username, password: password, favItem: '' })
        console.log('here is the result', result)
        res.locals.newUser = result;
        return next();
    }
    // catch errors
    catch(error) {
      return next({
        log: 'Express error handler caught in the createUser middleware function',
        status: 400,
        message: {err: 'An error ocurred while trying to create user in userController'}
      })
    }
  },
  
  
  async getUser(req, res, next) {
      // deconstruct data and check for invalid inputs
      const { username } = req.params;
      if(!username) {
        return next({
          log: 'Error in userController.getUser',
          status: 400,
          message: {err: 'Please fill out all fields'}
        });
      }
    // find user data in database
    try{
      const result = await User.findOne({ username })
      res.locals.getUser = result
      return next()
    }
    // catch errors
    catch(error){
      return next ({
        log: 'Express error handler caught in the getUser middleware function',
        status: 400,
        message: {err: 'An error ocurred while trying to getUser in userController'}
      })
    }
  },


  async setFavoriteItem(req, res, next) {
    // deconstruct data and check for invalid inputs
    const { username, favItem } = req.body;
    if(!username || !favItem) {
      return next({
        log: 'Error in userController.addFavoriteItem',
        status: 400,
        message: {err: 'Please fill out all fields'}
      });
    }
    // find user by username and update the favItem
    try {
      const updated = await User.findOneAndUpdate({username: username}, {favItem: favItem}, {new: true}) 
      res.locals.update = updated;
      return next();
    }
    // catch errors
    catch(error) {
      return next ({
        log: 'Express error handler caught in the addFavoriteItem middleware function',
        status: 400,
        message: {err: 'An error ocurred while trying to addFavoriteItem in userController'}
      })
    }
  }, 
  
  
  async deleteUser(req, res, next) {
    // deconstruct data and check for invalid inputs
    const { username } = req.params;
    if(!username) {
        return next({
          log: 'Error in userController.deleteUser',
          status: 400,
          message: {err: 'Please fill out field'}
        });
      }
    // find user by username and delete the user
      try {
        const deleted = await User.findOneAndDelete({ username: username })
        res.locals.deletedUser = deleted;
        return next();
      }
    // catch errors
      catch(error) {
      return next ({
          log: 'Express error handler caught in the addFavoriteItem middleware function',
          status: 400,
          message: {err: 'An error ocurred while trying to addFavoriteItem in userController'}
        })
      }
  }

}

module.exports = userController;
