const User = require('../models/userModel'); // we import user here because we need to use it in the register function
const bcrypt = require('bcrypt'); // we import bcryptjs here because we need to encrypt the password before saving it to the database

module.exports.register = async (req, res, next)=>{
  try{
    const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
        return res.json({message: "Username already exists", status: false});}

    const emailCheck = await User.findOne({email});
    if(emailCheck){
        return res.json({message: "Email already exists", status: false});}
    
    const salt = await bcrypt.genSalt(10); // what will the value of salt be
    // salt is a random string that is added to the password before hashing so that the same password does not have the same hash
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });
    await user.save();
    delete user.password;
    console.log(user);
    return res.json({status: true, message: "User registered successfully", user})
  }catch(err){
   next(err);
  }
};


module.exports.login = async (req, res, next)=>{
  try{
    const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({username});
    const emailCheck = await User.findOne({email});
   
    let isPasswordValid = false;
    if(usernameCheck !== null){
     isPasswordValid = await (bcrypt.compare(password, usernameCheck.password));
     delete usernameCheck.password;
    }
    if(emailCheck !== null){
     isPasswordValid = await (bcrypt.compare(password, emailCheck.password));
     delete emailCheck.password;
    }

    const user = usernameCheck || emailCheck;
    if(!isPasswordValid){
        return res.json({message: "Invalid password", status: false});
    }
    return res.json({status: true, user, usernameCheck, emailCheck})
    // if the password is valid, then we return the user object to the client through the response for the post request sent by the client
  }catch(err){
   next(err);
  }
};

module.exports.setAvatar = async (req, res, next)=>{
  try{
   const userId = req.params.id;
   const avatarImage = req.body.image;
   const userData = await User.findByIdAndUpdate(userId, {
    isAvatarImageSet: true,
    avatarImage,
   });
   return res.json({isSet: userData.isAvatarImageSet, image: userData.avatarImage});
  
  }catch(err){
   next(err);
  }
};


module.exports.getAllUsers = async (req, res, next)=>{
  try{
    const users = await User.find({_id:{$ne: req.params.id}}).select([
      "email","username","avatarImage","_id"
    ])
    return res.json(users);
  }catch(err){
   next(err);
  }
};