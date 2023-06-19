const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// si l'utilisateur est connecté
module.exports.checkUser = (req, res, next) => {

  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {

      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
      
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// si le token correspond
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {

      if (err) {
        console.log(err);
        res.send(200).json('no token'); // Si une erreur survient lors de la vérification du jeton, renvoie une réponse indiquant l'absence de jeton
      } else {
        console.log(decodedToken.id); // Log de l'identifiant extrait du jeton
        next(); // Passe à l'étape suivante du middleware
      }

    });

  } else {
    console.log('No token'); // Si aucun jeton n'est présent, affiche "No token" dans la console
  }
};

