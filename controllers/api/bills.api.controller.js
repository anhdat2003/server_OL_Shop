const billModel = require('../../models/bills.model');

exports.getListBill = async(req,res,next)=>{
    let dataReturn ={
        message:"Lấy dữ liệu thành công",
        status:200
    }
        let listBill = await billModel.billModel.find().populate("accountId").populate("productId");
        dataReturn.data = listBill;
    return res.json(dataReturn);
}

exports.createBill = async(req,res,next)=>{
    let dataReturn ={
        message:"thành công",
        status:200
    }
    try {
        let objBill = new billModel.billModel();
        objBill.accountId = req.body.accountId;
        objBill.productId = req.body.productId;
        objBill.totalPrice = req.body.totalPrice;
        objBill.quantity = req.body.quantity;
        objBill.status = req.body.status||0;
        await objBill.save();
    } catch (error) {
        dataReturn.message=error.message
        dataReturn.status=500
    }
    res.json(dataReturn);
}

exports.updateBill = async(req,res,next)=>{
    let dataReturn = {
        message: "Cập nhật thành công",
        status: 200
    };
    try {
        let bill = await billModel.billModel.findOne({_id:req.params.idBill}).populate("accountId").populate("productId");
        let updateBill = {
            status: req.body.status||0,
            updateAt: new Date()
        }
        await billModel.billModel.updateOne({_id:req.params.idBill},updateBill);
        
    } catch (error) {
        dataReturn.message=error.message
        dataReturn.status=500
    }
    res.json(dataReturn);
}