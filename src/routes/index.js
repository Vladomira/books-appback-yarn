const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const userBooksRouter = require("./userBooksRouter");
const userNotes = require("./userNotesRouter");

router.use("/user", userRouter);
router.use("/books", userBooksRouter);
router.use("/notes", userNotes);

module.exports = router;
