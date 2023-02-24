var express = require('express')
var morgan = require('morgan')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
const { result } = require('lodash')
var authRoutes = require('./routes/authRoutes')
var homeRoutes= require('./routes/homeRoutes')
const {requireAuth, checkUser} = require('./middlewares/authMiddlewares')
const bodyParser = require("body-parser");
const user = require('./models/users');
const { urlencoded } = require('body-parser')
const axios = require('axios')







var app = express()
// veri tabanı bağlantısı
mongoose.set('strictQuery', true);
var dbURL = 'mongodb+srv://esra:2316@mastitis.eaklaan.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((_result) => app.listen(3000))
    .catch((err) => console.log(err))

    
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', authRoutes)
app.use('/home',requireAuth, homeRoutes)


app.get('*',checkUser)



app.get('/register', (_req, res) => {
    res.render('register', { title: 'Üye Ol' })
})

app.get('/', (_req, res) => {
    res.redirect('/home')
})
app.get('/home', (_req, res) => {
    res.render('home', { title: 'Anasayfa' })
})

app.use((_req, res) => {
    res.status(404).render('404', { title: 'Sayfa Bulunamadı' })
})