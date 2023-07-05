const ApiError = require("../error/ApiError");
const db = require("../../database/models/index");

class userNotes {
   async createNote(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.Unauthorized());
         }

         const { bookId } = req.params;
         const { text, chapter } = req.body;
         if (!chapter) {
            return next(ApiError.Unauthorized());
         }
         const notes = await db.UserNotes.create({
            bookId,
            text,
            chapter,
            userId: req.user.id,
         });
         return res.status(201).json(notes);
      } catch (error) {
         return next(ApiError.BadRequest(error.message));
      }
   }

   async updateNoteById(req, res, next) {
      if (!req.user) {
         return next(ApiError.Unauthorized());
      }
      const { noteId } = req.params;
      const data = req.body;
      console.log("noteId", noteId);
      console.log("data", data);
      try {
         const updatedNote = await db.UserNotes.update(data, {
            where: { id: noteId },
         });
         if (!updatedNote) {
            return next(ApiError.BadRequest("Book doesn't exist"));
         }
         const updatedBook = await db.UserNotes.findByPk(noteId);
         return res.status(200).json(updatedBook);
      } catch (error) {
         return next(ApiError.BadRequest(error.message));
      }
   }

   async getNotes(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.Unauthorized());
         }
         const { id } = req.user;
         const notes = await db.UserNotes.findAll({
            where: { userId: id },
         });

         res.status(201).json(notes);
      } catch (error) {
         return next(ApiError.BadRequest(error.message));
      }
   }

   async getNotesByBookId(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.Unauthorized());
         }
         const { bookId } = req.params;
         const bookNotes = await db.UserNotes.findAll({
            where: { bookId },
         });
         if (!bookNotes) {
            return res.status(201).json({ message: "Not found" });
         }

         res.status(201).json(bookNotes);
      } catch (error) {
         return next(ApiError.BadRequest(error.message));
      }
   }
   async deleteNote(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.Unauthorized());
         }
         const { noteId } = req.params;
         const deletedNote = await db.UserNotes.findByPk(noteId);

         await deletedNote.destroy();
         res.status(201).json(deletedNote.id);
      } catch (error) {
         return next(ApiError.BadRequest(error.message));
      }
   }
}

module.exports = new userNotes();
