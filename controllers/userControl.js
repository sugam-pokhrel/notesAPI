const userModal = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SERECT_KEY = "NOTESAPI";
const register = async (req, res) =>{
  const {username, password, email} = req.body;
  try{
    const existUser = await userModal.findOne({email: email});
    if(existUser){
      res.status(400).json({message: "User already exist"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModal.create({
      username: username,
       password: hashedPassword,
        email: email
      });
      const token = jwt.sign(
        {email: result.email, id: result._id},SERECT_KEY,
      )
      res.status(200).json({user: result, token: token});

  }catch(err){
    console.log(err);
    res.status(500).json({message: "Something went wrong"});
  
  }
}

const signIn = (req, res) =>{

}
module.exports = {register, signIn};