const User = require('../models/users')
const jwt = require('jsonwebtoken')
const user = require('../models/users');



const maxAge = 60*60*24
const createToken = (id) => {
  return jwt.sign({id}, 'gizli kelime', {expiresIn: maxAge})
}

var login_get = (req, res) => {
    res.render('index', { title: "Giriş Yap" })
}


// kullanıcı giriş
var login_post =('/index', async (req, res) => {
    const {email, password} = req.body
    try{ 
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.redirect('/home') 
    }
    catch(e){
        console.log(e)
    }
 })

var register_get = (req, res) => {
    res.render('register', { title: "Üye Ol" })
}

// kullancı kayıt
var register_post = ('/register', (req, res) => {
    console.log(req.body)

    var user = new User(req.body)
    user.save()
        .then((_result) => {
            res.redirect('/login')
        })
        .catch((err) => {
            console.log(err)
        })
})

//kayıtlı veriyi silip çıkış yapmak için
var logout_get = (req, res) => { 
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/login')
}



module.exports = {
    login_get,
    login_post,
    register_get,
    register_post,
    logout_get
}
