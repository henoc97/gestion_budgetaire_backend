
const pool = require("../database_engine/database_params")
const {hashPassword, comparePasswords}  = require('../small_functions/hash_compare_pwd');
const mailTest = require('../small_functions/email_test');
const { UserModel } = require("../models/usersM");
const generateToken = require('../small_functions/token_engine');

module.exports.createUser = (req, res) => {
    
    pool.connect(async (err, client, release) => {
        try {
            if (err) {
                return console.error('Erreur de connexion au pool', err);
            }
            console.log(req.body);
            const {firstName, lastName, mailAddress, pwd, favoriteCurrency, sold} = req.body;
            if (mailTest(mailAddress)) {
                
                const pwdhashed = await hashPassword(pwd);
                console.log(pwdhashed);
                console.log('Connecté à PostgreSQL');
                const query = "SELECT * FROM insert_user($1, $2, $3, $4, $5, $6)";
                const values = [firstName, lastName, mailAddress, pwdhashed, favoriteCurrency, sold];
                return client.query(query, values, (err, result) => {
                 release();
                 if (err) {
                    res.status(404).json({ message: 'Requête non validée',err });
                    return console.error('Erreur lors de l\'exécution de la requête', err);
                 }
                 console.log(result.rows);
                 res.status(200).json({ message: 'Requête réussie' });
            });
                
            } else {
                res.status(404).json({ message: 'Entrer un email valide' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
        
        
    })
}


module.exports.userauth = (req, res) => {
    pool.connect((err, client, release) => {
        try {
            if (err) {
                return console.error('Erreur de connexion au pool', err);
            }
            console.log('Connecté à PostgreSQL');
            // Exemple d'exécution d'une requête SQL
            const {mailAddress, pwd} = req.body;
            console.log(mailAddress);
            if (mailTest(mailAddress)){
                const query = "SELECT * FROM user_auth($1)"
                const values = [mailAddress]
                return client.query(query, values, async (err, result) => {
                    release();
                    if (err) {
                        return console.error('Erreur lors de l\'exécution de la requête', err);
                    }
                    console.log(result.rows);
                    if (result.rows.length > 0) {
                        const pwdhashed = result.rows[0].mypassword
                        console.log(pwd, pwdhashed);
                        if(await comparePasswords(pwd, pwdhashed)){
                            console.log("ok");
                            const user = UserModel.jsonToNewUser(result.rows[0])
                            console.log("user:", user);
                            const newToke = generateToken({id : user.id, email : user.mailAddress})
                            console.log("mailAddress",  user.mailAddress);
                            console.log(newToke);
                            res.status(200).json({ token: newToke, user: user.toJSON()});
                        } else {
                            res.status(404).json({ message: 'Mot de passe incorrect' });
                        }
                    } else {
                        res.status(404).json({ message: 'Aucun utilisateur trouvé' });
                    }
                    
                });
            } else {
                res.status(404).json({ message: 'Entrer un email valide' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    })
}
