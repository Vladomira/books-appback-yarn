const UserService = require("../servise/user");
const ApiError = require("../error/ApiError");

const domain =
   process.env.NODE_ENV === "production"
      ? "vladomira-book-app.netlify.app/"
      : "localhost";

const cookieOptions = (req) => {
   const currentPath = req.path;
   return {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
      domain: "http://localhost:3000",
      path: currentPath,
      SameSite: "None",
   };
};
class UserController {
   async registration(req, res, next) {
      try {
         const { name, email, password } = req.body;
         if (!email || !password) {
            return next(
               new ApiError.BadRequest("Incorrect email or password ")
            );
         }
         const userData = await UserService.registration(name, email, password);
         res.cookie("refreshToken", userData.refreshToken, cookieOptions(req));
         const { id, accessToken } = userData;
         res.status(201).json({ user: { id, name, email }, accessToken });
      } catch (error) {
         next(error);
      }
   }

   async login(req, res, next) {
      try {
         const { email, password } = req.body;

         const userData = await UserService.login(email, password);
         res.cookie("refreshToken", userData.refreshToken, cookieOptions(req));

         const { accessToken, id, name } = userData;
         res.status(201).json({
            user: { id, name, email },
            accessToken,
         });
      } catch (error) {
         return next(error);
      }
   }

   async refreshUser(req, res, next) {
      try {
         const { refreshToken } = req.cookies;
         const userData = await UserService.refresh(refreshToken);

         res.cookie("refreshToken", userData.refreshToken, cookieOptions(req));

         const { accessToken, id, name, email } = userData;

         res.status(201).json({
            user: { id, name, email },
            accessToken,
         });
      } catch (error) {
         return next(error);
      }
   }
   async logout(req, res, next) {
      try {
         const { refreshToken } = req.cookies;
         const token = await UserService.logout(refreshToken);
         res.clearCookie("refreshToken");

         res.status(201).json(token);
      } catch (error) {
         next(error);
      }
   }
   async getUser(req, res, next) {
      try {
         const current = await UserService.getUser(req, res);
         return current;
      } catch (error) {
         next(error);
      }
   }
}
module.exports = new UserController();
