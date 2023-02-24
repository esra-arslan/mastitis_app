//doğrudan home sayfasına bağlantı ypılmasın diye olşuturulan kod satırları
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'gizli kelime', (err, decodedToken) => {
            if(err){
                console.error(err)
                res.redirect('/login')
            }else{
                console.error(decodedToken)
                next()
            }
        })

    }else{
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'gizli kelime', async(err, decodedToken) => {
            if(err){
                console.error(err)
                res.locals.user = null
            }else{
                console.error(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })

    }else{
        res.locals.user = null
        next()
    }
}

module.exports = {requireAuth, checkUser}