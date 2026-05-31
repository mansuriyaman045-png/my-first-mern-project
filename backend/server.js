const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db")
const authRouter = require("./routes/auth")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
require("dotenv").config();

const app  = express()
app.use(cors())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/products",productRouter)
app.use("/api/cart",cartRouter)



app.use("/",(req,res)=>{
  res.send("your api is running")
})

connectDb()

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
  console.log(`your server is running on http://localhost:${PORT}`)
})