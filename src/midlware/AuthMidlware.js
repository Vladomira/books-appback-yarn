const ApiError = require("../error/ApiError");
const tokenService = require("../servise/tokenServise.js");

function AuthMidlware(req, res, next) {
   if (req.method === "OPTIONS") {
      next();
   }
   try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
         return next(new ApiError.Unauthorized());
      }
      const accessToken = authHeader.split(" ")[1];
      if (!accessToken) {
         return next(new ApiError.Unauthorized());
      }
      const userData = tokenService.validateAccessToken(accessToken);
      if (!userData) {
         return next(new ApiError.Unauthorized());
      }

      req.user = userData;
      next();
   } catch (error) {
      throw ApiError.Unauthorized();
   }
}
module.exports = AuthMidlware;
