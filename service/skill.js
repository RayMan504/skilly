'use strict';

module.exports = function (sequelize) {
    var Skill = sequelize.import("../model/skill");
    return {
        create: function (req, res) {
            var newSkill = {
                skillid: req.body.skillid,
                name: req.body.name
            };
            Skill.create(newSkill).then(function () {
                res.send(200);
            });
        },
        get: function (req, res) {
            Skill.findAll().then(function (skills) {
                res.json(skills);
            });
        },
        getByID: function(req, res) {
            Skill.findById(req.params.id).then(function(skills) {
                res.json(skills);
            });
        },
        update: function(req, res) {
			Skill.update(req.body, {
			    where: {
					skillid: req.params.id
				}
			})
			.then(function(result) {
				res.json('It was updated!');
			}, function(err) {
				res.json(err);
			});
		},
		delete: function(req, res) {
			Skill.destroy({
				where: {
					skillid: req.params.id //this will be your id that you want to delete
				}
			}).then(function() {
				res.json('Deleted successfully');
			}, function(err) {
				console.log(err);
			});
		}
    };
};
