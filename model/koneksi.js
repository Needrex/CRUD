import mongoose from "mongoose"
import { config } from "dotenv"
config()

const URL_DATABASE = process.env.URL_DATABASE
const DATABASE_NAME = process.env.DATABASE_NAME

mongoose.connect(URL_DATABASE + DATABASE_NAME, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).
   catch(error => console.log(error))

// Or:
try {
   mongoose.connect(URL_DATABASE + DATABASE_NAME)
   console.log('RUN DATABASE');
} catch (error) {
   console.log(error)
}