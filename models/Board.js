const { name } = require('ejs');
const mongoose=require('mongoose');

const BoardSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        default:0
    }},{timestamps:true});

module.exports=mongoose.model('Board',BoardSchema);