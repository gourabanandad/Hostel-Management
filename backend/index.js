import express from 'express'
import { connectDB } from './db/connectDB.js' 
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/user.router.js' // import the user route
import imageRoutes from './routes/image.route.js' // import the image route
import complaintRoutes from './routes/complain.route.js' // import the complaint route
import mealRoutes from './routes/meal.route.js' // import the meal route



dotenv.config()


const app = express()
const port = process.env.PORT || 1000

app.use(cors({origin: "http://localhost:3000", credentials: true}))

app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/images",imageRoutes)
app.use("/api/complaints",complaintRoutes)
app.use("/api/meal", mealRoutes) 


app.listen(port, () => {
  connectDB()
  console.log(`Example app listening on port ${port}`)
  console.log("hii")
})