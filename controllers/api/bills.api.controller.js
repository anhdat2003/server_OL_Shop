const billModel = require('../../models/bills.model');
const productModel = require('../../models/products.model');
const accountModel = require('../../models/accounts.model');

exports.getListBill = async(req,res,next)=>{

    let listBill = await billModel.billModel.find().populate("productId");

    return res.status(200).json(listBill);
}

exports.getListBillByIdAccount = async (req, res, next) => {
    try {
      let listBill = await billModel.billModel.find({accountId: req.params.accountId});
      if (!listBill) {
        return res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
      }
      return res.status(200).json(listBill);
    } catch (error) {
      return res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
  };

  exports.createBill = async (req, res, next) => {
    try {
      let objBill = new billModel.billModel();
      objBill.accountId = req.body.accountId;
      objBill.productId = req.body.productId;
      objBill.totalPrice = req.body.totalPrice;
      objBill.quantity = req.body.quantity;
      objBill.statusBill = req.body.statusBill || 0;
  
      // Kiểm tra số lượng sản phẩm có đủ để mua không
      let product = await productModel.productModel.findById(req.body.productId);
      if (!product) {
        return res.status(404).send("Không tìm thấy sản phẩm");
      }
  
      if (product.quantity < req.body.quantity) {
        return res.status(400).send("Số lượng sản phẩm không đủ");
      }
  
      let account = await accountModel.accountModel.findById(req.body.accountId);
      var _money = req.body.quantity * product.price;
      if (!account) {
        return res.status(404).send("Không tìm thấy tài khoản");
      }
      if (account.money < _money) {
        return res.status(400).send("Số dư tài khoản không đủ");
      }
      if (product.quantity - req.body.quantity < 0 || account.money - _money < 0) {
        return res.status(400).send("Số lượng sản phẩm hoặc số dư tài khoản không đủ");
      }
  
      // Trừ số lượng sản phẩm khi mua hàng
      product.quantity -= req.body.quantity;
      account.money -= _money;
      await product.save();
      await account.save();
      await objBill.save();
  
      res.json(objBill)
    } catch (error) {
      return res.status(500).send("Đã xảy ra lỗi khi tạo hóa đơn: " + error.message);
    }
    
  };

  exports.updateBill = async (req, res, next) => {
    let dataReturn = {
      message: "Cập nhật thành công",
      status: 200
    };
  
    try {
      let bill = await billModel.billModel.findById(req.params.idBill).populate("accountId").populate("productId");
  
      if (!bill) {
        dataReturn.message = "Không tìm thấy hóa đơn";
        dataReturn.status = 500;
        return res.json(dataReturn);
      }
  
      let updateBill = {
        statusBill: req.body.statusBill,
        updateAt: new Date()
      };
  
      await billModel.billModel.updateOne({ _id: req.params.idBill }, updateBill);
    } catch (error) {
      dataReturn.message = error.message;
      dataReturn.status = 500;
    }
  
    res.json(dataReturn);
  };