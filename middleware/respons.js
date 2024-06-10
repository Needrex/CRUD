export const respons = (statusCode, message, data, res) => {
   res.json(statusCode, [
      {
         payload: data,
         message,
         meta: [

         ]
      }
   ])
}

