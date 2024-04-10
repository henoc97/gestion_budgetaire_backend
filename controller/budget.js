const pool = require("../database_engine/database_params")
const jwt = require('jsonwebtoken');
const {BudgetModel} = require("../models/budgetsM")

const key = '700bfbaff3587aa6b49560474a316b14dd1a0b2b67cd320fc0c079318457ecf1b8650c19e9f835c25c3f36addc40488a119ed6d2624fe8be792541da688a7140';    


module.exports.createBudgets = (req, res) => {
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Erreur de connexion au pool', err);
        }
        console.log('Connecté à PostgreSQL');
        // Exemple d'exécution d'une requête SQL

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
                        const {categoryname, budgetamount, periods, begindate} = req.body;
                        const query = "SELECT * FROM insert_budgets($1, $2, $3, $4, $5)";
                        const values = [_tokendata.userId, categoryname, budgetamount, begindate, periods];
                        return client.query(query, values, (err, result) => {
                            release();
                            if (err) {
                                return console.error('Erreur lors de l\'exécution de la requête', err);
                            }
                            console.log(result.rows);
                            res.status(200).json({ message: "requête réussie" });
                    })
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }
        
    })
}

module.exports.userBudgets = (req, res) => {
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
                        const query1 = "SELECT * FROM show_mybudget($1)"
                        const values1 = [_tokendata.userId]
                        client.query(query1, values1, (err1, result1) => {
                            if (err1) {
                                release();
                                return console.error('Erreur lors de l\'exécution de la première requête', err1);
                            }
                            console.log(result1.rows);
                            if (result1.rows.length  > 0) {
                                var budgetsList = [];
                                result1.rows.forEach(row =>
                                    {
                                        budgetsList.push(BudgetModel.JsonToNewBudget(row)) 
                                    })
                                console.log("budgetsList : ", budgetsList);
                                const budgetNotifs = BudgetModel.checkBudgetstatement(budgetsList)
                                console.log("budgetNotifs : ", budgetNotifs);
                                budgetNotifs.forEach(e => {
                                    const query2 = "SELECT * FROM insert_notif($1, $2)"
                                    const values2 = [_tokendata.userId, 
                                        {
                                            "notiftype" : "budgets", 
                                            "budgetID" : e.element.id, 
                                            "category" : e.element.categoryname,
                                            "state" : e.state
                                        }
                                    ]
                                    client.query(query2, values2, (err2, result2) => {
                                        if (err2) {
                                            return console.error('Erreur lors de l\'exécution de la deuxième requête', err2);
                                        }
                                        console.log(result2.rows);
                                    });
                                });
                            }
                            release(); 
                            res.status(200).json({ message: result1.rows });
                        });
                    }
                }
            )
        } catch (error) {
            console.log('Erreur lors de l\'exécution', error);
        }
    })
}


module.exports.deletebudget = (req, res) => {
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
                        const {budgetid} = req.body;
                        // Exemple d'exécution d'une requête SQL
                        const query = "SELECT * FROM deletebudget($1)"
                        const values = [budgetid]
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

