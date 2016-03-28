'use strict';

const 
  Sequelize = require('sequelize');
  

let server;

const 
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bcrypt = require('bcrypt'),
    session = require('express-session');
    
    
app
    .use(function(req, res, next) {
        console.log(req.method, req.url);
        next();
    })
    .use(bodyParser.json())
    
    .use(cookieParser())
    .use(express.static(path.join(__dirname, 'public')));
    // .use(session({secret: 'anyStringOfText', saveUnitialized: true, resave: true}));

module.exports.close = function() {
    console.log('shutting down the server...');
    server.close();
};

// sequelize initialization //
const sequelize = new Sequelize('skilly', process.env.C9_USER.slice(0, 16), '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false,
  }
});
const userService = require("./service/user")(sequelize);
const skillService = require("./service/skill")(sequelize);
const jctService = require("./service/user_skill_junction")(sequelize);
 
//sync the model with the database
sequelize.sync().then(function (res) {
  app.route('/user')
    .get(userService.get)
    .post(userService.create)
    .put(userService.update) //  
    .delete(userService.delete); //
  
  app.route('/skill')
    .get(skillService.get)
    .post(skillService.create)
    .put(skillService.update) // 
    .delete(skillService.delete); // 
    
  app.route('/user_skill_junction')
    .get(jctService.get)
    .post(jctService.create)
    .put(jctService.update) // 
    .delete(jctService.delete); // 
  // app.route('/')
    server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
      var addr = server.address();
      console.log("Server listening at", addr.address + ":" + addr.port);
    });
})
.catch(function(e) {
    console.log('Error in sequelize.sync(): ' + e);
});