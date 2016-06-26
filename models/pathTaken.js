var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pathTakenSchema = new Schema({
	objectId: Schema.Types.ObjectId,
	uniqueRequestID: {type: String, required: true },
	entirePath: {type: String, required: true },
	creation_date: {type: Date, required: true },
	philosophyFound:{type: Boolean, required: true}
})

module.exports = mongoose.model("pathTaken",pathTakenSchema);





