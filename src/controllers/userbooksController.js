const ApiError = require("../error/ApiError");
const db = require("../../database/models/index");

//bookId -id book from google, id -id from postgresql
class UserBooksController {
   async addUserBook(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.Unauthorized());
         }
         const { bookId } = req.params;
         const book = await db.UserBooks.findOne({
            where: { bookId, userId: req.user.id },
         });
         if (book) {
            return next(ApiError.conflict("Book already exists"));
         }
         const { favorite, finished, inProgress, author, title, image } =
            req.body.book;

         const newUserBook = await db.UserBooks.create({
            bookId,
            favorite,
            finished,
            inProgress,
            userId: req.user.id,
            image,
            author,
            title,
         });
         return res.json(newUserBook.dataValues);
      } catch (error) {
         return next(ApiError.BadRequest(error.message));
      }
   }

   async getUserBooks(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.Unauthorized());
         }
         const { id } = req.user;
         const books = await db.UserBooks.findAll({
            where: { userId: id },
         });

         res.json(books);
      } catch (error) {
         return next(ApiError.BadRequest(error.message));
      }
   }

   async updateBookStatus(req, res, next) {
      if (!req.user) {
         return next(ApiError.Unauthorized());
      }
      const { id } = req.params;
      const data = req.body;
      try {
         const book = await db.UserBooks.update(data, {
            where: { id },
         });
         if (!book) {
            return next(ApiError.BadRequest("Book doesn't exist"));
         }
         const updatedBook = await db.UserBooks.findByPk(id);
         return res.status(200).json(updatedBook);
      } catch (error) {
         return next(ApiError.BadRequest(error.message));
      }
   }

   async deleteBookById(req, res, next) {
      try {
         if (!req.user) {
            return next(ApiError.Unauthorized);
         }
         const { id } = req.params; //!!!!databse ID
         const deletedContact = await db.UserBooks.findByPk(id);

         if (!deletedContact) {
            return next(ApiError.BadRequest("Book doesn't exist"));
         }
         await deletedContact.destroy();
         res.json(deletedContact.id);
      } catch (error) {
         return next(ApiError.BadRequest(error.message));
      }
   }
}

module.exports = new UserBooksController();
