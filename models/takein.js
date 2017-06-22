//模型
var mongoose=require('mongoose');
var TakeinSchema=require('../schemas/takein');
var Takein=mongoose.model('takein',TakeinSchema);

module.exports=Takein;