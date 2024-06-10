export const errorHandler = (error, req, res, next) => {
   error.statusCode = error.statusCode || 500
   error.errorDetail = error.errorDetail || ""
   switch (error.statusCode) {
      case 400:
         error.status = "Bad Request"
         break;
      case 401:
         error.status = "Unauthorized"
         break;
      case 404:
         error.status = "Not Found"
         break;
      case 500:
         error.status = "Server Error"
         break;
      default:
         break;
   }
   res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      errorDetail: error.errorDetail
   })
}