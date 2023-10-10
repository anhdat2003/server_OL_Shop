var db = require('./db');
const mongooseTimestamp = require('mongoose-timestamp');

const billSchema = new db.mongoose.Schema(
    {
        accountId:{type: db.mongoose.Schema.Types.ObjectId,ref:"accountModel"},
        productId:{type: db.mongoose.Schema.Types.ObjectId, ref:"productModel"},
        totalPrice:{type:Number,required:true},
        quantity:{type:Number,required:true},
        status:{type:Number,required:true}
    },
    {
        collection:"bills"
    }
);
billSchema.plugin(mongooseTimestamp);
let billModel = db.mongoose.model("billModel",billSchema);

module.exports = {
    billModel
}