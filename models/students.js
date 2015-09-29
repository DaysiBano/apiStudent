

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var studentSchema = new Schema({
	studentName 		: { type : String},
	studentLastName 	: { type : String},
	studentEmail 		: { type : String},
	studentCareer	 	: { type : String},
	studentRol 			: { type : String},
	studentPassword 	: { type : String},
	studentTutor		: { type : String},
	studentPeriod		: { type : String},
	studentCreditsAc	: { type : Number},
	studentCod			: { type : Number},  
	provider 			: { type : String},
	provider_id 		: { type : String, unique : true},
	photo				: { type : String},
	createdAt			: { type : Date, default : Date.now}  
})

module.exports = mongoose.model('Students', studentSchema)
