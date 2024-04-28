const {register, login, setAvatar, getAllUsers} = require("../controllers/userController");

const router = require("express").Router();
// this helps in requiring router from express

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers); // this route is for getting all the users except the current user
module.exports = router;

// what is happening here is that we are requiring the router from express and then we are using the post method on it
// and then we are passing the route and the controller function to it.
// so when the route is hit, the controller function will be executed.
// this is how we are using the MVC architecture in our project.