const pool = require("../database_engine/database_params")



module.exports.create_account = (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Erreur de connexion au pool', err);
        }
        console.log('Connecté à PostgreSQL');
        // Exemple d'exécution d'une requête SQL
        const query = "SELECT * FROM create_account($1, $2)";
        const values = [req.userID, req.sold];
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



module.exports.updatesold = (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Erreur de connexion au pool', err);
        }
        console.log('Connecté à PostgreSQL');
        // Exemple d'exécution d'une requête SQL
        const query = "SELECT * FROM updatesold($1, $1)"
        const values = [req.id, req.newSold]
        return client.query(query, values, (err, result) => {
            release();
            if (err) {
                return console.error('Erreur lors de l\'exécution de la requête', err);
            }
            console.log(result.rows);
            res.status(200).json({ message: result.rows });
        });
    })
}