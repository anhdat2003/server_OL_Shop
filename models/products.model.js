var db = require('./db');
const mongooseTimestamp = require('mongoose-timestamp');

const productSchema = new db.mongoose.Schema(
    {
        name:{type:String,required:true},
        description:{type:String,required:false},
        price:{type:Number,required:true},
        quantity:{type:Number,required:true},
        imageProduct:{type:String,required:true},
        categoryId:{type:db.mongoose.Schema.Types.ObjectId,ref:"categoryModel"},
    },
    {
        collection:"products"
    }
);
productSchema.plugin(mongooseTimestamp);
let productModel = db.mongoose.model("productModel",productSchema);

const categorySchema = new db.mongoose.Schema(
    {
        name:{type:String,required:true}
    },
    {
        collection:"categories"
    }
);
let categoryModel = db.mongoose.model("categoryModel",categorySchema);

module.exports={
    productModel,
    categoryModel
}