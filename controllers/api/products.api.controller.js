const productModel = require('../../models/products.model');

exports.getListProduct = async(req,res,next)=>{
    
    let listProduct = await productModel.productModel.find().populate("categoryId")   
    return res.status(200).json(listProduct);
}

exports.getProductById = async(req,res,next)=>{
    let product = await productModel.productModel
        .findOne({ _id: req.params.idProduct }).populate("categoryId")
    return res.status(200).json(product);
}
exports.getProductById2 = async(req,res,next)=>{
    let product = await productModel.productModel
        .findOne({ _id: req.params.idProduct })
    return res.status(200).json(product);
}

exports.getProductByIdCategory = async(req,res,next)=>{
    let product = await productModel.productModel.find({categoryId:req.params.idCategory}).populate("categoryId")
      return res.status(200).json(product);
}

exports.getListCategory = async(req,res,next)=>{
   
    let listCategory = await productModel.categoryModel.find();
    return res.status(200).json(listCategory);
}
exports.getCategoryById = async(req,res,next)=>{
    let category = await productModel.categoryModel
        .findOne({ _id: req.params.idCategory })
    return res.status(200).json(category);
}

exports.createProduct = async(req,res,next)=>{
    try {
        let objProduct = new productModel.productModel();
        objProduct.name = req.body.name;
        objProduct.description = req.body.description;
        objProduct.price = req.body.price;
        objProduct.quantity = req.body.quantity;
        objProduct.imageProduct = req.body.imageProduct||"";
        objProduct.categoryId = req.body.categoryId;
        await objProduct.save();
        res.status(200).json(objProduct);
    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}

exports.createCategory = async(req,res,next)=>{
    try {
        let objCategory = new productModel.categoryModel();
        objCategory.name = req.body.name;
        await objCategory.save();
        res.status(200).json(objCategory);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
      let product = await productModel.productModel
        .findOne({ _id: req.params.idProduct })
        .populate("categoryId");
  
      let updateProduct = {
        name: req.body.name || product.name,
        description: req.body.description || product.description,
        price: req.body.price || product.price,
        quantity: req.body.quantity || product.quantity,
        imageProduct: req.body.imageProduct || product.imageProduct,
        categoryId: req.body.categoryId || product.categoryId,
        updateAt: new Date(),
      };
  
      await productModel.productModel.updateOne({ _id: req.params.idProduct },updateProduct);
        res.status(200).json(product)
      
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

exports.updateCategory = async(req,res,next)=>{
    try {
        let category = await productModel.categoryModel.findOne({_id:req.params.idCategory});
        let updateCategory = {
            name: req.body.name||category.name,
            updateAt: new Date(),
        }
        await productModel.categoryModel.updateOne({_id:req.params.idCategory},updateCategory)
        res.status(200).json(category);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}