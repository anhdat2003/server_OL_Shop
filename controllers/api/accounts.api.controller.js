const { utc } = require("moment-timezone");
const accountModel = require("../../models/accounts.model");
const bcrypt = require("bcrypt");

exports.login = async(req,res,next)=>{
    let dataReturn = {
        status:200,
        message:""
    }
    let account = await accountModel.accountModel.findOne({username:req.body.username});
    if(account!=null){
        let checkPasswd = await bcrypt.compare(req.body.passwd,account.passwd);
        console.log(checkPasswd);
        if(checkPasswd==true){
            dataReturn.message="Đăng nhập thành công"
            dataReturn.status=200
            dataReturn.data = account
        }else{
            dataReturn.message="Sai mật khẩu"
            dataReturn.status=204
        }
    }else{
        dataReturn.message="Tài khoản không tồn tại"
        dataReturn.status =500
    }
    res.json(dataReturn)
}

exports.getAccount = async(req,res,next)=>{
    const idAccount = req.params.idAccount;
    let account = await accountModel.accountModel.findOne({_id:idAccount})
    res.json(account)
}

exports.listAccount = async(req,res,next)=>{

    var list = await accountModel.accountModel.find().sort({username:1})
    res.status(200).json(list);
}

// exports.createAccount = async(req,res,next)=>{
//     let dataReturn = {
//         message: "Tạo tài khoản thành công",
//         status: 200
//     };
//     try {
//         let objAccount = new accountModel.accountModel();
//         objAccount.username = req.body.username;
//         const salt = await bcrypt.genSalt(15);
//         objAccount.passwd = await bcrypt.hash(req.body.passwd,salt);
//         objAccount.fullname = req.body.fullname;
//         objAccount.email = req.body.email;
//         objAccount.phone = req.body.phone;
//         objAccount.address = req.body.address;
//         objAccount.avatar = req.body.avatar;
//         objAccount.roleId = '651bf925468e6af7a621cd54';
//         await objAccount.save();
//     } catch (error) {
//         dataReturn.message=error.message
//         dataReturn.status=500
//     }
//     res.json(dataReturn);
// }
// exports.createAccount = async (req, res, next) => {
//     let dataReturn = {
//       message: "Tạo tài khoản thành công",
//       status: 200,
//     };
//     try {
//       let objAccount = new accountModel.accountModel();
//       objAccount.username = req.body.username;
//       const salt = await bcrypt.genSalt(15);
//       objAccount.passwd = await bcrypt.hash(req.body.passwd, salt);
//       objAccount.fullname = req.body.fullname;
//       objAccount.email = req.body.email;
//       // Trường phone, address và avatar để rỗng
//       objAccount.phone = '';
//       objAccount.address = '';
//       objAccount.avatar = '';
//       objAccount.money = 0;
//       objAccount.roleId = '651bf925468e6af7a621cd54';
//       await objAccount.save();
//     } catch (error) {
//       dataReturn.message = error.message;
//       dataReturn.status = 500;
//     }
//     res.json(dataReturn);
//   };
exports.createAccount = async (req, res, next) => {
    try {
      // Kiểm tra xem đã tồn tại tài khoản với username đã nhập chưa
      const existingAccount = await accountModel.accountModel.findOne({
        username: req.body.username,
      });
      if (existingAccount) {
        return res.status(400).send("Username đã tồn tại.");
      }
  
      let objAccount = new accountModel.accountModel();
      objAccount.username = req.body.username;
      const salt = await bcrypt.genSalt(15);
      objAccount.passwd = await bcrypt.hash(req.body.passwd, salt);
      objAccount.fullname = req.body.fullname;
      objAccount.email = req.body.email;
      // Trường phone, address và avatar để rỗng
      objAccount.phone = "";
      objAccount.address = "";
      objAccount.avatar = "";
      objAccount.money = 0;
      objAccount.roleId = "651bf925468e6af7a621cd54";
      await objAccount.save();
      res.status(200).send("Đăng ký thành công");
    } catch (error) {
        return res
        .status(500)
        .send("Đã xảy ra lỗi khi đăng ký: " + error.message);
    }
  
    
  };

exports.updateAccount = async(req,res,next)=>{
    let passwd = req.body.passwd ||"";
    let fullname = req.body.fullname||"";
    let avatar = req.body.avatar||""
    let email = req.body.email||""
    let phone = req.body.phone || "";
    let address = req.body.address || "";
    try {
        let account = await accountModel.accountModel.findOne({_id:req.params.idAccount})
        let accountUpdate = account;
        if(passwd!=""&&fullname!=""&&avatar!=""&&email!=""&&phone!=""&&address!=""){
            const salt = await bcrypt.genSalt(15);
            let passwd2 = await bcrypt.hash(passwd,salt);
            console.log("step1");

            accountUpdate.passwd = passwd2;
            accountUpdate.fullname = req.body.fullname;
            accountUpdate.avatar = req.body.avatar;
            accountUpdate.email = req.body.email;
            accountUpdate.phone = req.body.phone;
            accountUpdate.updatedAt = new Date();
            accountUpdate.address = req.body.address;
            
            await accountModel.accountModel.updateOne({_id:req.params.idAccount},accountUpdate);
            return res.status(200).json(accountUpdate)
        }else{
            console.log("step2");
            if(passwd!=""){
                const salt = await bcrypt.genSalt(15)
                let passwd2 = await bcrypt.hash(passwd, salt);
                accountUpdate.passwd = passwd2
                accountUpdate.updatedAt = new Date();
            }else{
                accountUpdate.passwd = account.passwd
                accountUpdate.updatedAt = new Date();
            }
            //
            if(fullname!=""){
                accountUpdate.fullname = fullname
                accountUpdate.updatedAt = new Date();
            }else{
                accountUpdate.fullname = account.fullname
                accountUpdate.updatedAt = new Date();
            }
            //
            if(avatar!=""){
                accountUpdate.avatar = avatar
                accountUpdate.updatedAt = new Date();
            }else{
                accountUpdate.avatar = account.avatar
                accountUpdate.updatedAt = new Date(); 
            }
            //
            if(email!=""){
                accountUpdate.email = email
                accountUpdate.updatedAt = new Date();
            }else{
                accountUpdate.email = account.email
                accountUpdate.updatedAt = new Date();
            }
            //
            if(phone!=""){
                accountUpdate.phone = phone
                accountUpdate.updatedAt = new Date();
            }else{
                accountUpdate.phone = account.phone
                accountUpdate.updatedAt = new Date();
            }
            //
            if(address!=""){
                accountUpdate.address = address
                accountUpdate.updatedAt = new Date();
            }else{
                accountUpdate.address = account.address
                accountUpdate.updatedAt = new Date();
            }
            await accountModel.accountModel.updateOne({_id:req.params.idAccount}, accountUpdate)
            return res.status(200).json(accountUpdate)
        }
    } catch (error) {
        return res.status(500).send("Đã xảy ra lỗi khi cập nhật: " + error.message);
    }
}
exports.changePassword = async (req, res, next) => {
    const accountId = req.params.idAccount;
    const currentPassword = req.body.currentPassword || "";
    const newPassword = req.body.newPassword || "";
  
    try {
      // Tìm tài khoản trong cơ sở dữ liệu
      const account = await accountModel.accountModel.findById(accountId);
      if (!account) {
        return res.status(404).send("Tài khoản không tồn tại.");
      }
  
      // Kiểm tra mật khẩu hiện tại
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        account.passwd
      );
      if (!isPasswordValid) {
        return res.status(400).send("Mật khẩu hiện tại không đúng.");
      }
  
      // Kiểm tra mật khẩu mới trùng với mật khẩu hiện tại
      const isSamePassword = await bcrypt.compare(newPassword, account.passwd);
      if (isSamePassword) {
        return res
          .status(400)
          .send("Mật khẩu mới phải khác mật khẩu hiện tại.");
      }
  
      // Mã hóa mật khẩu mới
      const salt = await bcrypt.genSalt(15);
      const newPasswordHashed = await bcrypt.hash(newPassword, salt);
  
      // Cập nhật mật khẩu mới vào cơ sở dữ liệu
      account.passwd = newPasswordHashed;
      account.updatedAt = new Date();
  
      await account.save();
  
      return res.status(200).json(accountId)
    } catch (error) {
      return res
        .status(500)
        .send("Đã xảy ra lỗi khi đổi mật khẩu: " + error.message);
    }
  };