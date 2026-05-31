const express = require("express");
const {products,getAllProduct,updateProduct,deleteProdct} = require("../controllers/productcontroller");

const router = express.Router()

router.post("/add",products)
router.get("/",getAllProduct)
router.put("/update/:id",updateProduct)
router.delete("/delete/:id",deleteProdct)

module.exports=router