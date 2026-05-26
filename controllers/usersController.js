const userModal = require("../modals/user");
const { validateSignUpData } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const connectionRequestModal = require("../modals/connectionRequest");

const getUsers = (req, res) => {
  console.log("user router");
  res.send("this is user router");
};

const postUserData = async (req, res) => {
  const userObj = req.body;
  try {
    //validation of data
    validateSignUpData(req);
    const passwordHash = await bcrypt.hash(userObj.password, 10);
    userObj.password = passwordHash;
    const user = new userModal(userObj);
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
};

const LoginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const validaeEmail = validator.isEmail(emailId);
    if (!emailId) throw new Error("email id is required");
    if (!validaeEmail) throw new Error("invalid email id");
    const user = await userModal.findOne({ emailId: emailId });
    if (!user) throw new Error("invaild username");
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new Error("invaild password");
    //create a JWT token
    const access_token = await user.getJWT();
    //add the token to cookie and send the response back to the uaer
    res.cookie("access_token", access_token);
    res.status(200).send("user login successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.send("profile data:" + user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
};

const LogoutUser = async (req, res) => {
  try {
    const user = req.user;
    res.cookie("access_token", null, {
      expires: new Date(Date.now()),
    });
    res.send("logout suceessfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
};

const EditProfile = async (req, res) => {
  try {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "emailId",
      "photoUrl",
      "gender",
      "age",
      "about",
      "skills",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field)
    );
    if (!isEditAllowed) throw new Error("invaild edit request");
    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    const udatedUser = await userModal.findByIdAndUpdate(user._id, user);
    res.send("edit successfully" + udatedUser);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
};

const receivedRequests = async (req, res) => {
  try {
    const user = req.user;
    const connectionRequests = await connectionRequestModal
      .find({ toUserId: user._id })
      .populate("fromUserId", ["firstName", "lastName", "emailId", "skills"])
      .populate("toUserId", ["firstName", "emailId"]);
    res.status(200).json({
      message: "received request",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).json({
      message: `Error: ${err.message}`,
    });
  }
};

const receivedUserData = async(req,res)=>{
  try{
    res.status(200).json({
      message:`user data fetched successfully`
    })
  }catch(err){
    res.status(400).json({
      message:`Error: ${err.message}`
    })
  }
}
module.exports = {
  getUsers,
  postUserData,
  LoginUser,
  getUserProfile,
  LogoutUser,
  EditProfile,
  receivedRequests,
  receivedUserData
};
