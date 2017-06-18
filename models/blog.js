//模型
var mongoose=require('mongoose');
var BlogSchema=require('../schemas/blog');
var Blog=mongoose.model('blog',BlogSchema);

module.exports=Blog;