const Router = require("express");
const router = new Router();
const userNotes = require("../controllers/userNotesController");

const authMidlware = require("../midlware/AuthMidlware");

router.post("/:bookId", authMidlware, userNotes.createNote);
router.get("/:userId", authMidlware, userNotes.getNotes);
router.get("/book-notes/:bookId", authMidlware, userNotes.getNotesByBookId);
router.patch("/:noteId", authMidlware, userNotes.updateNoteById);
router.delete("/:noteId", authMidlware, userNotes.deleteNote);

module.exports = router;
