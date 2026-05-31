const Cart = require("../models/cart");

const addtocart = async(req,res)=>{
  try {
    const {userId,productId} = req.body
    let cart =  await Cart.findOne({userId})
    if(!cart){
      cart = new Cart({userId,items:[{productId,quantity:1}]})
    } else{
      const item = cart.items.find(i=> i.productId.toString() === productId)
      if(item){
        item.quantity +=1
      }else{
        cart.items.push({productId,quantity:1})
      }
    }
    await cart.save()
    res.json({message:"your cart is created",cart})
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"error in addtocart",error})
  }
}

const remove = async(req,res)=>{
  try {
    const {userId,productId}=req.body;
    const cart = await Cart.findOne({userId})
    if(!cart){
      return res.status(404).json({message:"cart not found"})
    }
    cart.items = cart.items.filter(i=> i.productId.toString() !== productId)
    await cart.save()
    res.status(200).json({message:"cart item removed   secsessfully"})
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"error in remove",error})
  }
}

const update = async(req,res)=>{
  try {
    const {userId,productId,quantity}=req.body;
    const cart = await Cart.findOne({userId})
    if(!cart){
      return res.status(404).json({message:"cart not found"})
    }
    const item = cart.items.find(i=> i.productId.toString() === productId)
    if(!item){
      return res.status(404).json({message:"item not found in cart"})
    }
    item.quantity=quantity
    await cart.save()
    res.json({message:"cart updated sucessfully",cart})
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"error in update",error})
  }
}

const getcart = async(req,res)=>{
  try {
    const {userId}= req.params
    let cart = await Cart.findOne({userId}).populate("items.productId")
    if(!cart){
      return res.json({userId, items:[]})
    }
    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"error in getcart",error})
  }
}

module.exports = {addtocart,remove,update,getcart}