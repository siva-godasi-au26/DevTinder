const Router = require("router");
const router = Router();
const {
  getUsers,
  postUserData,
  LoginUser,
  getUserProfile,
  LogoutUser,
  EditProfile,
  receivedRequests,
  receivedUserData
} = require("../controllers/usersController");
const { userAuth } = require("../middlewares/auth");

router.get("/user", getUsers);
router.post("/user/signUp", postUserData);
router.post("/user/login", LoginUser);
router.get("/user/profile", userAuth, getUserProfile);
router.post("/user/logout", userAuth, LogoutUser);
router.patch('/user/profile/edit',userAuth,EditProfile)
router.get('/user/requests/received',userAuth,receivedRequests)
router.get('/user/requests/feed',userAuth,receivedUserData)

module.exports = router;
