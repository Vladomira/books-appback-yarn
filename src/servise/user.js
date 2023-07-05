const bcrypt = require("bcryptjs");
const ApiError = require("../error/ApiError");
const db = require("../../database/models/index");
const tokenServise = require("./tokenServise");

class UserService {
   async registration(name, email, password) {
      const candidate = await db.User.findOne({ where: { email } });
      if (candidate) {
         throw ApiError.conflict(`User with email ${email} already exists`);
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const id = Date.now().toString();

      const userPayload = { id, name, email };
      const tokens = tokenServise.generateTokens(userPayload);

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
         const tokens = tokenServise.generateTokens(userPayload);
         await db.User.update({ ...tokens }, { where: { email } });
         return { ...userPayload, ...tokens };
      } catch (error) {
         throw error;
      }
   }

   async refresh(refreshToken) {
      if (!refreshToken || refreshToken.trim() === "") {
         throw ApiError.Unauthorized();
      }
      const userFromDb = await db.User.findOne({
         wehere: { refreshToken: refreshToken },
      });
      const userData = tokenServise.validateRefreshToken(refreshToken);

      if (!userData || !userFromDb) {
         throw ApiError.Unauthorized();
      }
      const findById = await db.User.findByPk(userData.id);
      const userPayload = {
         id: findById.dataValues.id,
         name: findById.dataValues.name,
         email: findById.dataValues.email,
      };
      const tokens = tokenServise.generateTokens(userPayload);
      await db.User.update({ ...tokens }, { where: { id: findById.id } });

      return { ...userPayload, ...tokens };
   }
   async logout(refreshToken) {
      const user = await db.User.findOne({ where: { refreshToken } });
      if (!user) {
         throw ApiError.Unauthorized();
      }
      await db.User.update(
         { refreshToken: null, accessToken: null },
         { where: { refreshToken } }
      );

      return refreshToken;
   }
   async getUser(req, res) {
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
}
module.exports = new UserService();
