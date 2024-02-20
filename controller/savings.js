const pool = require("../database_engine/database_params")
const jwt = require('jsonwebtoken');

const key = '700bfbaff3587aa6b49560474a316b14dd1a0b2b67cd320fc0c079318457ecf1b8650c19e9f835c25c3f36addc40488a119ed6d2624fe8be792541da688a7140';    


module.exports.create_saving = (req, res) => {
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
                        const {goal, targetamount, currency, allsaving, reachgoaldate} = req.body;
                        // Exemple d'exécution d'une requête SQL
                        const query = "SELECT * FROM insert_savings($1, $2, $3, $4, $5, $6)";
                        const values = [_tokendata.userId, goal, targetamount, currency, allsaving, reachgoaldate];
                        return client.query(query, values, (err, result) => {
                            release();
                            if (err) {
                                return console.error('Erreur lors de l\'exécution de la requête', err);
                            }
                            console.log(result.rows);
                            res.status(200).json({ message: result.rows });
                        });
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        } 
    })
}



module.exports.userGoals = (req, res) => {
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
                        const query = "SELECT * FROM show_mygoals($1)"
                        const values = [_tokendata.userId]
                        return client.query(query, values, (err, result) => {
                            release();
                            if (err) {
                                return console.error('Erreur lors de l\'exécution de la requête', err);
                            }
                            console.log(result.rows);
                            res.status(200).json({ message: result.rows });
                        });
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        } 
       })
}



module.exports.addsaving = (req, res) => {
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
                        const {budgetid, amount, descriptions} = req.body;
                        // Exemple d'exécution d'une requête SQL
                        const query = "SELECT * FROM usergoals($1, $2)"
                        const values = [req.userID, req.newSaving]
                        return client.query(query, values, (err, result) => {
                            release();
                            if (err) {
                                return console.error('Erreur lors de l\'exécution de la requête', err);
                            }
                            console.log(result.rows);
                            res.status(200).json({ message: result.rows });
                        });
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }

        
    })
}


module.exports.deletesaving = (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Erreur de connexion au pool', err);
        }
        console.log('Connecté à PostgreSQL');
        // Exemple d'exécution d'une requête SQL
        const query = "SELECT * FROM deletesaving($1)"
        const values = [req.id]
        return client.query(query, values, (err, result) => {
            release();
            if (err) {
                return console.error('Erreur lors de l\'exécution de la requête', err);
            }
            console.log(result.rows);
            res.status(200).json({ message: 0 });
        });
    })
}

