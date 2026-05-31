const Product = require("../models/products");

const products = async(req,res)=>{
  try {
    const product = await Product.create(req.body)
    res.json({message:"your product created sucessfully",product})
  } catch (error) {
    res.status(500).json({message:" server error in products",error})
  }
}

const getAllProduct = async(req,res)=>{
  try {
    const {search , category} = req.query;
    const filter = {};
    if(search){
      filter.title={$regex:search,$options:'i'}
    }
    if(category){
      filter.category = category
    }
    const product = await Product.find(filter).sort({createdAt:-1});
    res.json(product)
  } catch (error) {
    res.status(500).json({message:" server error in getAllProducts",error})
  }
}

const updateProduct = async(req,res)=>{
  try {
    const update= await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {returnDocument:"after"}
    )
    if(!update){
      return res.status(404).json({message:"product not found"})
    }
    res.status(200).json({message:"product updated sucessfully",update})
  } catch (error) {
    res.status(500).json({message:" server error in updateProduct",error})
    
  }
}

const deleteProdct = async(req,res)=>{
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.json({message:"your product deleted sucessfully"})
  } catch (error) {
    res.status(500).json({message:" server error in deleteProduct",error})
    
  }
}

module.exports={products,getAllProduct,updateProduct,deleteProdct}