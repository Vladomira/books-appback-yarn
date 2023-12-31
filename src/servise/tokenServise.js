const jwt = require("jsonwebtoken");
const db = require("../../database/models/index");

class TokenServise {
   generateTokens(payload) {
      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
         expiresIn: "1d",
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
         expiresIn: "10d",
      });

      return { accessToken, refreshToken };
   }

   validateAccessToken(token) {
      console.log("token", token);
      try {
         const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
         return userData;
      } catch (error) {
         return null;
      }
   }
   validateRefreshToken(token) {
      try {
         const userData = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
         return userData;
      } catch (error) {
         return null;
      }
   }
   async findToken(refreshToken) {
      const tokenData = await db.User.findOne({ where: { refreshToken } });
      return tokenData;
   }
}

module.exports = new TokenServise();
