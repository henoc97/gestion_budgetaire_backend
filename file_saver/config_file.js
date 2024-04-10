const multer  = require('multer');
const path = require('path');


// Configuration de multer pour gérer les fichiers reçus
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Dossier de destination des fichiers
      console.log(req.body);
      console.log(file);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // Nom du fichier sur le serveur
      console.log(req.body);
    }
  });
  const upload = multer({ storage: storage });

  module.exports = {upload}