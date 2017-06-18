//模型
var mongoose=require('mongoose');
var WebdbSchema=require('../schemas/Webdb');
var Webdb=mongoose.model('web',WebdbSchema);

module.exports=Webdb;
