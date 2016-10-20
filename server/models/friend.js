var mongoose = require('mongoose');
// build your friend schema and add it to the mongoose.models

var FriendSchema = new mongoose.Schema({
	name: {
		firstname: String,
		lastname: String
	},
	birthday: Date,
}, { timestamps: true });

var Friend = mongoose.model('Friend', FriendSchema);