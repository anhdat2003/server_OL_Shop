var express = require('express');
var router = express.Router();
const apiAccount = require('../controllers/api/accounts.api.controller');
const apiProduct = require('../controllers/api/products.api.controller');
const apiBill = require('../controllers/api/bills.api.controller');

router.post('/login',apiAccount.login);
router.post('/createAccount',apiAccount.createAccount);
router.get('/account/:idAccount',apiAccount.getAccount);
router.put('/account/:idAccount',apiAccount.updateAccount);
router.get('/listAccount',apiAccount.listAccount);
///-----------------------------///
router.get('/listProduct',apiProduct.getListProduct);
router.post('/createProduct',apiProduct.createProduct);
router.put('/product/:idProduct',apiProduct.updateProduct);
router.get('/productById/:idProduct',apiProduct.getProductById);
router.get('/productById2/:idProduct',apiProduct.getProductById2);
router.get('/productByIdCategory/:idCategory',apiProduct.getProductByIdCategory);
///----------------------------///
router.get('/listCategory',apiProduct.getListCategory);
router.post('/createCategory',apiProduct.createCategory);
router.put('/category/:idCategory',apiProduct.updateCategory);
router.get('/getCategoryById/:idCategory',apiProduct.getCategoryById);
///---------------------------///
router.get('/listBill',apiBill.getListBill);
router.post('/createBill',apiBill.createBill);
router.put('/bill/:idBill',apiBill.updateBill);
router.get('/getListBillByIdAccount/:accountId',apiBill.getListBillByIdAccount);
// router.get('/statisticalTotalMoney/:statusBill',apiBill.statisticalTotalMoney);
// router.get('/statisticalBillStatus/:statusBill',apiBill.statisticalBillByStatus);
router.get('/statisticalBill',apiBill.statisticalBill);
module.exports = router;