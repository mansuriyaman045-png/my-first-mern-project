const express = require("express")
const {addtocart,remove,update,getcart} = require("../controllers/cartcontroller")
const router = express.Router()

router.post("/add",addtocart)
router.post("/remove",remove)
router.post("/update",update)
router.get("/:userId",getcart)

module.exports = router; 