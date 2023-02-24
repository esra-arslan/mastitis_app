const express = require('express')
const router = express.Router();


router.get('/home', (_req, res) => {
    res.render('home', { title: 'Anasayfa' })
})

module.exports =router