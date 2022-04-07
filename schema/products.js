const mongoose=require('mongoose');
var Register=mongoose.Schema;
const product=new Register({
    sellermail:{
        type:String
    },
    productname:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
});
module.exports = mongoose.model('Product',product);