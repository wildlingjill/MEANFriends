var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');

module.exports = {

	index: function(req,res){
		Friend.find({}, function(err, data){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				console.log('successfully found friends');
				console.log(data);
				res.json(data);
			}
		});
	},


	create: function(req,res){
		var friend = new Friend({name: {firstname: req.body.firstname, lastname: req.body.lastname}, birthday: req.body.birthday});
		friend.save(function(err, data){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				console.log("Successfully added friend");
				res.json(data);
			}
		})		
	},


	update: function(req,res){
		console.log(req.body.firstname);
		console.log(req.body.lastname);
		console.log(req.body.birthday);
		Friend.findByIdAndUpdate({_id: req.params.id}, {$set: {name: {firstname: req.body.firstname, lastname: req.body.lastname}, birthday: req.body.birthday}}, function(err, friend){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				friend.save(function(err, data){
					if(err){
						console.log(err);
						rea.json(err);
					} else {
						res.json(data);
					}
				})
			}
		});
		
	},


	delete: function(req,res){
		Friend.findOne({_id: req.params.id}, function(err, data){
			if(err){
				console.log(err);
				res.json(err);
			} else {
				if(data){
					Friend.remove(data, function(err, data){
						if(err){
							console.log(err);
							res.json(err);
						} else {
							console.log("Successfully unfriended");
							res.json(data);
						}
					})
				}
			}
		})
	},


	show: function(req,res){
		Friend.findOne({_id: req.params.id}, function(err, data){
			if(err){
				console.log(err);
			} else {
				res.json(data);
			}
		})
	}
}

