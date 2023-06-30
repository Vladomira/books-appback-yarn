const Router = require("express");
const router = new Router();
const UserBooksController = require("../controllers/userbooksController");

const authMidlware = require("../midlware/AuthMidlware");

router.post("/:bookId", authMidlware, UserBooksController.addUserBook);
router.get("/", authMidlware, UserBooksController.getUserBooks);
router.patch("/:id/status", authMidlware, UserBooksController.updateBookStatus);
router.delete("/:id", authMidlware, UserBooksController.deleteBookById);

module.exports = router;
