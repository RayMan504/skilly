'use strict';

module.exports = function (sequelize) {
    var jctUserSkill = sequelize.import("../model/user_skill_junction");
    return {
        create: function (req, res) {
            var newUserSkill = {
                userid: req.body.userid,
                skilli: req.body.skillid
            };
            jctUserSkill.create(newUserSkill).then(function () {
                res.send(200);
            });
        },
        get: function (req, res) {
            jctUserSkill.findAll().then(function (UserSkill) {
                res.json(UserSkill);
            });
        },
        getByID: function(req, res) {
            jctUserSkill.findById(req.params.id).then(function(UserSkill) {
                res.json(UserSkill);
            });
        },
        update: function(req, res) {
			jctUserSkill.update(req.body, {
				where: {
    				skillid: req.params.id,
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
			jctUserSkill.destroy({
				where: {
					userid: req.params.id, //this will be your id that you want to delete
					skillid: req.params.id
				}
			}).then(jctUserSkill.destroy({
				where: {
					userid: req.params.id, //this will be your id that you want to delete
					skillid: req.params.id
				}
			}).then(function() {
				res.json('Deleted successfully');
			}, function(err) {
				console.log(err);
			}));
		}
    };
};