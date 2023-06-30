class ApiError extends Error {
   constructor(status, message, errors) {
      super(message);
      this.status = status;
      this.errors = errors;
   }
   static Unauthorized() {
      return new ApiError(401, "User is not authorized");
   }
   static BadRequest(message, errors) {
      return new ApiError(404, message, errors);
   }
   static conflict(message) {
      return new ApiError(409, message);
   }

   static Forbidden(message) {
      return new ApiError(403, message);
   }
}

module.exports = ApiError;
