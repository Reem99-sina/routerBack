const userModel = require("../../DB/model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.getById=async(req,res)=>{
  if(req.user){
    const user=await userModel.findById(req.user.id).populate({
      path:"categories",
      populate:[{path:"tasks"},{path:"lists"}]
    })
    res.status(201).send({user})
  }else{
    res.status(401).send("unauthorized")
  }
}
module.exports.signup = async (req, res) => {
  // try {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    const newUser = new userModel({ name, email, password });
    const saveUser = await newUser.save();
    res.status(200).json({ message: "done" });
  } else {
    res.status(400).json({ message: "this email duplicate" });
  }
};
module.exports.signin = async (req, res) => {
  // try {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(200).json({ message: "not have this user" });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json({ message: "wrong password" });
    } else {
      const token = jwt.sign(
        { id: user._id, isLogged: true },
        process.env.JWTCODE
      );
      res.json({ message: "done", token });
    }
  }
};
