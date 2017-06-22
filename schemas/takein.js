var mongoose = require('mongoose')
var TakeinSchema = new mongoose.Schema({
	image:String,
	title:String,
	sumsrc:String,
	github:String,
	summary:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		},
	}
})
 TakeinSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}
	next();
})
 TakeinSchema.statics = {
	fetch:function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb) {
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}
module.exports = TakeinSchema;