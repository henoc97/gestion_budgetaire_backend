const pool = require("../database_engine/database_params")
const jwt = require('jsonwebtoken');

const key = '700bfbaff3587aa6b49560474a316b14dd1a0b2b67cd320fc0c079318457ecf1b8650c19e9f835c25c3f36addc40488a119ed6d2624fe8be792541da688a7140';    

module.exports.user_account = (req, res) => {
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
                        // Exemple d'exécution d'une requête SQL
                            const query = "SELECT * FROM show_myaccount($1)";
                            const values = [_tokendata.userId];
                            return client.query(query, values, (err, result) => {
                                release();
                                if (err) {
                                    return console.error('Erreur lors de l\'exécution de la requête', err);
                                }
                                console.log(result.rows);
                                res.status(200).json(result.rows[0]);
                            });
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }
        
    })
}



module.exports.transfer_to_sold = (req, res) => {
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
                        // Exemple d'exécution d'une requête SQL
                            const {amount, descriptions} = req.body;
                            const query = "SELECT * FROM insert_transfer($1, $2, $3)";
                            const values = [_tokendata.userId, amount, descriptions];
                            return client.query(query, values, (err, result) => {
                                release();
                                if (err) {
                                    return console.error('Erreur lors de l\'exécution de la requête', err);
                                }
                                console.log(result.rows);
                                res.status(200).json({message : result.rows});
                            });
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }
        
    })
}


module.exports.account_savingsbank = (req, res) => {
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
                        // Exemple d'exécution d'une requête SQL
                            const {amount} = req.body;
                            const query = "SELECT * FROM account_savingsbank($1, $2)";
                            const values = [_tokendata.userId, amount];
                            return client.query(query, values, (err, result) => {
                                release();
                                if (err) {
                                    return console.error('Erreur lors de l\'exécution de la requête', err);
                                }
                                console.log(result.rows);
                                res.status(200).json({message : result.rows});
                            });
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }
        
    })
}


module.exports.user_transfers = (req, res) => {
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
                        // Exemple d'exécution d'une requête SQL
                            const query = "SELECT * FROM show_transfers($1)";
                            const values = [_tokendata.userId];
                            return client.query(query, values, (err, result) => {
                                release();
                                if (err) {
                                    return console.error('Erreur lors de l\'exécution de la requête', err);
                                }
                                console.log(result.rows);
                                res.status(200).json(result.rows);
                            });
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }
        
    })
}