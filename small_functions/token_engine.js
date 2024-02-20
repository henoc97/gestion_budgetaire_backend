
const jwt = require('jsonwebtoken');


function generateToken(user) {
    
    const key = '700bfbaff3587aa6b49560474a316b14dd1a0b2b67cd320fc0c079318457ecf1b8650c19e9f835c25c3f36addc40488a119ed6d2624fe8be792541da688a7140';    
    const payload = {
        userId : user.id,
        userEmail : user.email,
    };

    const options = {
        expiresIn : '1h'
    };

    const token = jwt.sign(payload, key, options);
    return token;

}
 module.exports = generateToken;