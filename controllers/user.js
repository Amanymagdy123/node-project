const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);
const User = require('../models/User');//database

// create new user//registeration
const create = (user) => User.create(user);

//login
const login = async ({ username, password }) => {
// get user from DB
    const user = await User.findOne({ username }).exec(); 
    if (!user) {
//if return null mean there isn't match user
      throw Error('UN_AUTHENTICATED');
    }
    const isVaildPass = user.validatePassword(password);
    if (!isVaildPass) { 
      throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
      username: user.username,
      id: user.id,
    },'SECRET_MUST_BE_COMPLEX', { expiresIn: 'id' });
debugger
    
     return {...user.toJSON(), token };
 
  };

  //getALL
  const getAll = () => User.find({}).exec();
 
//edit by id //edit in one//update//patch
  const editOne = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();

//get by id
const getById = (id) => User.findById(id).exec();

//delete by id
//const deleteOne =(id) =>User.findOneAndDelete(id).exec();
const deleteOne =(id) =>User.remove({_id:id});



//follow
const addfollow = (id, trgetid)=> User.updateOne(
  { "_id": trgetid},
  {
      $push: {
        following: id
      }
  }
);

//unfollow
const removefollow = (id, trgetid)=> User.updateOne(
  { "_id": trgetid },
  {
      $pull: {
        following: id
      }
  }
);

module.exports = {
    create, login,getAll, editOne,getById , deleteOne,addfollow ,removefollow} ;