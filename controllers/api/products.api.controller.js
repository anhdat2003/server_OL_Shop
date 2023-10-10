const productModel = require('../../models/products.model');

exports.getListProduct = async(req,res,next)=>{
    let dataReturn ={
        message:"Lấy dữ liệu thành công",
        status:200
    }
    let categoryId = req.query.categoryId||"";
    try {
        if(categoryId==""){
            let listProduct = await productModel.productModel.find().populate("categoryId");
            dataReturn.data = listProduct;
        }else{
            let listProduct = await productModel.productModel.find({categoryId:categoryId}).populate("categoryId");
            dataReturn.data = listProduct;
        }
    } catch (error) {
        dataReturn.message=error;
        dataReturn.status=500;
    }
    return res.json(dataReturn);
}

exports.getListCategory = async(req,res,next)=>{
    let dataReturn ={
        message :"Lấy dữ liệu thành công",
        status:200
    }
    try {
        let listCategory = await productModel.categoryModel.find();
        dataReturn.data = listCategory;
    } catch (error) {
        dataReturn.message= error;
        dataReturn.status = 500;
    }
    return res.json(dataReturn);
}

exports.createProduct = async(req,res,next)=>{
    let dataReturn = {
        message: "Tạo sản phẩm thành công",
        status: 200
    };
    try {
        let objProduct = new productModel.productModel();
        objProduct.name = req.body.name;
        objProduct.description = req.body.description;
        objProduct.price = req.body.price;
        objProduct.quantity = req.body.quantity;
        objProduct.imageProduct = req.body.imageProduct;
        objProduct.categoryId = req.body.categoryId;
        await objProduct.save();
    } catch (error) {
        dataReturn.message=error.message
        dataReturn.status=500
    }
    res.json(dataReturn);
}

exports.createCategory = async(req,res,next)=>{
    let dataReturn = {
        message: "Tạo thể loại thành công",
        status: 200
    };
    try {
        let objCategory = new productModel.categoryModel();
        objCategory.name = req.body.name;
        await objCategory.save();
    } catch (error) {
        dataReturn.message=error.message
        dataReturn.status=500
    }
    res.json(dataReturn);
}

// exports.updateProduct = async(req,res,next)=>{
//     let dataReturn ={
//         status:200,
//         message:"Cập nhật sản phẩm thành công"
//     }
//     let name = req.body.name||"";
//     let description = req.body.description||"";
//     let price = req.body.price||"";
//     let quantity = req.body.quantity||"";
//     let imageProduct = req.body.imageProduct||"";
//     let categoryId = req.body.categoryId||"";
//     try {
//         let product = await productModel.productModel.findOne({_id:req.params.idProduct}).populate("categoryId");
//         let updateProduct = product;
//         if(name!=""&&price!=""&&quantity!=""&&imageProduct!=""&&categoryId!=""){
//             updateProduct.name = req.body.name;
//             updateProduct.description = req.body.description;
//             updateProduct.price = req.body.price;
//             updateProduct.quantity = req.body.quantity;
//             updateProduct.imageProduct = req.body.imageProduct;
//             updateProduct.categoryId = req.body.categoryId;
//             updateProduct.updateAt = new Date();
//             await productModel.productModel.updateOne({_id:req.params.idProduct},updateProduct);
//             return res.json(dataReturn)
//         }else{
//             if(name!=""){
//                 updateProduct.name = name
//                 updateProduct.updateAt = new Date();
//             }else{
//                 updateProduct.name = product.name;
//                 updateProduct.updateAt = new Date();
//             }
//             //
//             if(description!=""){
//                 updateProduct.description = description
//                 updateProduct.updateAt = new Date();
//             }else{
//                 updateProduct.description = product.description;
//                 updateProduct.updateAt = new Date();
//             }
//             //
//             if(price!=""){
//                 updateProduct.price = price
//                 updateProduct.updateAt = new Date();
//             }else{
//                 updateProduct.price = product.price;
//                 updateProduct.updateAt = new Date();
//             }
//             //
//             if(quantity!=""){
//                 updateProduct.quantity = quantity
//                 updateProduct.updateAt = new Date();
//             }else{
//                 updateProduct.quantity = product.quantity;
//                 updateProduct.updateAt = new Date();
//             }
//             //
//             if(imageProduct!=""){
//                 updateProduct.imageProduct = imageProduct
//                 updateProduct.updateAt = new Date();
//             }else{
//                 updateProduct.imageProduct = product.imageProduct;
//                 updateProduct.updateAt = new Date();
//             }
//             //
//             if(categoryId!=""){
//                 updateProduct.categoryId = categoryId
//                 updateProduct.updateAt = new Date();
//             }else{
//                 updateProduct.categoryId = product.categoryId;
//                 updateProduct.updateAt = new Date();
//             }
//             await productModel.productModel.updateOne({_id:req.params.idProduct},updateProduct);
//             return res.json(dataReturn)
//         }
//     } catch (error) {
//         dataReturn.message=error
//         dataReturn.status=500
//     }
// }
exports.updateProduct = async (req, res, next) => {
    let dataReturn = {
        message: "Cập nhật sản phẩm thành công",
        status: 200
    };
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
  
      await productModel.productModel.updateOne(
        { _id: req.params.idProduct },
        updateProduct
      );
  
      
    } catch (error) {
        dataReturn.message=error.message
        dataReturn.status=500
    }
    res.json(dataReturn);
};

exports.updateCategory = async(req,res,next)=>{
    let dataReturn = {
        message: "Cập nhật thể loại thành công",
        status: 200
    };
    try {
        let category = await productModel.categoryModel.findOne({_id:req.params.idCategory});
        let updateCategory = {
            name: req.body.name||category.name,
            updateAt: new Date(),
        }
    } catch (error) {
        dataReturn.message=error.message
        dataReturn.status=500
    }
}