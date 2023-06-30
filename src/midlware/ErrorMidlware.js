const ApiError = require("../error/ApiError");

module.exports = function (err, req, res, next) {
   console.log("errrr", err);
   if (err instanceof ApiError) {
      return res
         .status(err.status)
         .json({ message: err.message, error: err.errors });
   }

   return res.status(500).json({ message: err.message });
};
