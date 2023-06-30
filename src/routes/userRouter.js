const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userController");
const authMidlware = require("../midlware/AuthMidlware");

router.post("/signup", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.get("/current", authMidlware, UserController.getUser);

module.exports = router;
