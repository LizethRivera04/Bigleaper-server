const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    //checks if user has a valid token
    const token = req.header('x-access-token');
    if (!token) {
        return res.status(401).json({ msg: 'Necesitas un token para acceder a esta página' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.userId = decoded.id
    res.status(200)
    next()
}

module.exports = { verifyToken }