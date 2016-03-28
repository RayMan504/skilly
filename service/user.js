'use strict';
var bcrypt = require('bcrypt');
module.exports = function (sequelize) {
    var User = sequelize.import("../model/user");
    var Creds = sequelize.import("../model/creds");
    
    User.hasOne(Creds, {foreignKey: 'idUser'});
    Creds.hasOne(User, {foreignKey: 'id'});
    return {
        create: function (req, res) {
            User.findOne({
               where: {
                   username: req.body.username
               } 
            })
            // if found, return message "username taken"
            .then(function(user) {
                if(user) {
                    console.log('username taken');
                    return res.json({message: 'username taken'});    
                }
                //otherwise, create new user //
                var newUser = {
                   nameFirst: req.body.nameFirst,
                   nameLast: req.body.nameLast,
                   age: req.body.age,
                   username: req.body.username
                };
                User.create(newUser).then(function (user) {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(req.body.password, salt, function(err, hash) {
                            Creds.create({
                                idUser: user.id,
                                hash: hash,
                                salt: salt
                            }).then(function() {
                                res.json(user);
                            });
                        });
                    });
                });
            });
        },
        get: function (req, res) {
            User.findAll().then(function (user) {
                res.json(user);
            });
        },
        getByID: function(req, res) {
            User.findById(req.params.id).then(function(user) {
                res.json(user);
            });
        },
        update: function(req, res) {
			User.update(req.body, {
				where: {
					userid: req.params.id
				}
			})
			.then(function(result) {
				res.json('It was updated!');
			}, function(err) {
				res.json(err);
			});
		},
		delete: function(req, res) {
			User.destroy({
				where: {
					userid: req.params.id //this will be your id that you want to delete
				}
			}).then(function() {
				res.json('Deleted successfully');
			}, function(err) {
				console.log(err);
			});
		}
        
    };
};
