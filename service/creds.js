module.exports = function (sequelize) {
    var creds = sequelize.import("../model/creds");
    
    
    
    return {
        create: function (req, res) {
            var newCred = {
                hash: req.body.colorsid,
                salt: req.body.name
            };
            creds.create(newCred).then(function () {
                res.send(200);
            });
        },
        get: function (req, res) {
            creds.findAll().then(function (creds) {
                res.json(creds);
            });
        },
        getByID: function(req, res) {
            creds.findById(req.params.id).then(function(creds) {
                res.json(creds);
            });
        },
        update: function(req, res) {
			creds.update(req.body, {
			    where: {
					credsid: req.params.id
				}
			})
			.then(function(result) {
				res.json('It was updated!');
			}, function(err) {
				res.json(err);
			});
		},
		delete: function(req, res) {
			creds.destroy({
				where: {
					hash: req.params.id, //this will be your id that you want to delete
					salt: req.params.id
				}
			}).then(function() {
				res.json('Deleted successfully');
			}, function(err) {
				console.log(err);
			});
		}
    };
};