const mongoose = require("mongoose");

const connectDb = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("your mongoose is connected sucessfully")
  } catch (error) {
    console.error("error in mongoose",error)
    process.exit(1)
  }
}

module.exports = connectDb; 