const {addMessage,getMessages} = require("../controllers/messagesController");
const router = require("express").Router();
// this helps in requiring router from express

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
module.exports = router;

