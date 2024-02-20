const jwt = require('jsonwebtoken');
const CurrenciesConversionSingle = require('../currencyconversion/currencyconversion');

const key = '700bfbaff3587aa6b49560474a316b14dd1a0b2b67cd320fc0c079318457ecf1b8650c19e9f835c25c3f36addc40488a119ed6d2624fe8be792541da688a7140';    


module.exports.convertamount = (req, res) => {
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
                    const {amounttoconvert, currencytoconvert, currencyconvert} = req.body;
                    return res.status(200).json({"message" : 
                     CurrenciesConversionSingle(amounttoconvert, 
                        currencytoconvert, currencyconvert)})
                }
            }
        )
    } catch (error) {
        console.log('Erreur lors de l\'exécution', error);
    }
}
