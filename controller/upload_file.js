
const {upload} = require('../file_saver/config_file');



module.exports.upload_file = upload.single('file'), async (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Erreur de connexion au pool', err);
        }
        console.log('Connecté à PostgreSQL');


        try {
            const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }
            jwt.verify(
                token,
                key,
                async(_err, _tokendata) => {
                    console.log(_tokendata);
                    if (_err) {
                        return res.status(403).json({message: 'Token not valid'})
                    } else {
                        console.log(_tokendata.userId, _tokendata.userEmail);
                        try {
                            if (!req.file) {
                                return res.status(400).json({ message: 'Aucun fichier n\'a été envoyé' });
                            }
                    
                            const { filename, mimetype, size } = req.file;
                            const { meta1, meta2 } = req.body;
                            console.log(filename, mimetype, size);
                            console.log(meta1, meta2);
                            
                            const query = "SELECT * FROM addfile($1, $2, $3, $4)"
                            const values = [_tokendata.userId, filename, mimetype, size]
                            return client.query(query, values, (err, result) => {
                                release();
                                if (err) {
                                    return console.error('Erreur lors de l\'exécution de la requête', err);
                                }
                                console.log(result.rows);
                                res.status(200).json({ 
                                    message1: result.rows, 
                                    message2: 'Fichier uploadé avec succès', 
                                    file: { filename, mimetype, size, meta1, meta2 } });
                            });
                        } catch (err) {
                            console.error(err);
                            res.status(500).json({ message: 'Une erreur s\'est produite lors du traitement de la demande' });
                        }
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }
        
    })
    
    
    
};




module.exports.delete_file = async (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Erreur de connexion au pool', err);
        }
        console.log('Connecté à PostgreSQL');


        try {
            const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }
            jwt.verify(
                token,
                key,
                async(_err, _tokendata) => {
                    console.log(_tokendata);
                    if (_err) {
                        return res.status(403).json({message: 'Token not valid'})
                    } else {
                        console.log(_tokendata.userId, _tokendata.userEmail);
                        try {
                            if (!req.file) {
                                return res.status(400).json({ message: 'Aucun fichier n\'a été envoyé' });
                            }
                    
                            const { filename, mimetype, size } = req.file;
                            const { meta1, meta2 } = req.body;
                            console.log(filename, mimetype, size);
                            console.log(meta1, meta2);
                            
                            const query = "SELECT * FROM deletefile($1, $2, $3, $4)"
                            const values = [_tokendata.userId, filename, mimetype, size]
                            return client.query(query, values, (err, result) => {
                                release();
                                if (err) {
                                    return console.error('Erreur lors de l\'exécution de la requête', err);
                                }
                                console.log(result.rows);
                                res.status(200).json({ 
                                    message1: result.rows, 
                                    message2: 'Fichier uploadé avec succès', 
                                    file: { filename, mimetype, size, meta1, meta2 } });
                            });
                        } catch (err) {
                            console.error(err);
                            res.status(500).json({ message: 'Une erreur s\'est produite lors du traitement de la demande' });
                        }
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }  
    })
};
