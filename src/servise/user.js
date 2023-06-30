const bcrypt = require("bcryptjs");
const ApiError = require("../error/ApiError");
const db = require("../../database/models/index");
const tokenServise = require("./tokenServise");

class UserService {
   async registration(name, email, password) {
      const candidate = await db.User.findOne({ where: { email } });
      if (candidate) {
         throw ApiError.BadRequest(`User with email ${email} already exists`);
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const id = Date.now().toString();

      const userPayload = { id, name, email };
      const tokens = tokenServise.generateToken(userPayload);

      await db.User.create({
         ...userPayload,
         ...tokens,
         password: hashPassword,
      });

      return { ...userPayload, ...tokens };
   }

   async login(email, password) {
      try {
         const user = await db.User.findOne({ where: { email } });
         if (!user) {
            throw ApiError.BadRequest(`User doesn't exist`);
         }

         const comparePassword = bcrypt.compareSync(password, user.password);
         if (!comparePassword) {
            throw ApiError.BadRequest(`Wrong password`);
         }

         const userPayload = { id: user.id, name: user.name, email };
         const tokens = tokenServise.generateToken(userPayload);
         await db.User.update({ ...tokens }, { where: { email } });
         return { ...userPayload, ...tokens };
      } catch (error) {
         // 401
         throw ApiError.BadRequest(error.message);
      }
   }

   async logout(refreshToken) {
      const user = await db.User.findOne({ where: { refreshToken } });
      if (!user) {
         throw ApiError.BadRequest(`You are not authorized`);
      }
      await db.User.update({ refreshToken: null }, { where: { refreshToken } });
      //   accessToken: null

      return refreshToken;
   }
   async refresh(refreshToken) {
      if (!refreshToken) {
         throw ApiError.Unauthorized();
      }
      console.log("555555", refreshToken);
      const userData = tokenServise.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenServise.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
         throw ApiError.Unauthorized();
      }

      const user = await db.User.findByPk(userData.id);
      const userPayload = { id: user.id, name: user.name, email: user.email };
      const tokens = tokenServise.generateToken(userPayload);
      await db.User.update({ ...tokens }, { where: { id: userData.id } });

      return { ...userPayload, ...tokens };
   }

   async getUser(req, res) {
      console.log("!req.user", req.user);
      try {
         if (!req.user) {
            throw ApiError.Unauthorized();
         }
         const { email, name, id } = req.user;
         return res.json({
            user: {
               email,
               name,
               id,
            },
         });
      } catch (error) {
         return ApiError.BadRequest(error.message);
      }
   }

   async deleteUser(req, res) {
      // зробити форму з вводом пароля для того, щоб видалитись
      const userId = req.params.id;
      try {
         const user = await db.User.findByPk(userId);

         if (!user) {
            return ApiError.internal(`User doesn't exist`);
         }
         // перевірку на пароль user.password === password але треба з джвт токеном звіряти
         await user.destroy();
         res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
         return ApiError.badRequest(error.message);
      }
   }
}
module.exports = new UserService();
