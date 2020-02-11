const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
const cookieParser = require('cookie-parser');

const sequelize = require('./utils/database');
const authData = require('./routes/auth/auth');
const User = require('./models/user');
const Role = require('./models/role');
const UserRole = require('./models/user-role');

const app = express();

app.use(cookieParser());

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies)
  {
      token = req.cookies['jwt'];
  }
  return token;
};
jwtOptions.jwtFromRequest = cookieExtractor;

// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    User.findByPk(jwt_payload.id)
    .then(user => {
        if (user) {
            jwtOptions.user = user;
            next(null, user);
          } else {
            next(null, false);
          }
    })
    .catch(err => console.log(err));
  });
  // use the strategy
  passport.use(strategy);

  app.use(passport.initialize());

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use( (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use((req, res, next) => {
    req.jwtOptions = jwtOptions;
    next();
});


// Auth Rooutes
app.use(authData);


//If Page not found
app.use((req, res, next) => {
    res.status(404).render('404');
});





// Relationships
// Role.belongsTo(User);
// User.hasMany(Role);
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });
// Role.belongsTo(User);
// User.hasMany(Role);



sequelize
// .sync({ force: true })
.sync()
.then( result => {
    // console.log(result);
    console.log('Connection has been established successfully port 3200.');
    app.listen(3200);
})
.catch( err => console.log(err));
