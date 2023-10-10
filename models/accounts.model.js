var db = require('./db');
const mongooseTimestamp = require('mongoose-timestamp');

const accountSchema = new db.mongoose.Schema(
    {
        username:{type: String,required:true},
        passwd:{type:String,required:true},
        fullname:{type:String,required:true},
        email:{type:String,required:false},
        phone:{type:String,required:false},
        address:{type:String,required:true},
        avatar:{type:String,required:false},
        roleId:{type:db.mongoose.Schema.Types.ObjectId, ref:"roleModel"},
    },
    {
        collection:"accounts"
    }
);
accountSchema.plugin(mongooseTimestamp);
let accountModel = db.mongoose.model("accountModel",accountSchema);

const roleSchema = new db.mongoose.Schema(
    {
        name:{type:String,required:true}
    },
    {
        collection:"roles"
    }
);
let roleModel = db.mongoose.model("roleModel",roleSchema);

module.exports = {
    accountModel,
    roleModel
};