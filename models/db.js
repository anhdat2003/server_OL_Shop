var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://anhdat:anhdat@cluster0.h029lzn.mongodb.net/olshopdb?retryWrites=true&w=majority')
        .catch( (err)=>{
                console.log("Loi ket noi CSDL: ");
                console.log(err);
        });
        // mongodb://127.0.0.1:27017/db_OL_Shop
module.exports = { mongoose };