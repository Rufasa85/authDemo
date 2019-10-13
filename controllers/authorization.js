var express = require("express");
var router = express.Router();
var db = require('../models');
const bcrypt = require('bcrypt');


router.get('/secret',function(req,res){
    if(req.session.user) {
        res.render('securepage',req.session.user);
    }else {
        res.send('log in first jabroni!')
    }
})

router.get('/allUsers',function(req,res){
    db.User.findAll().then(function(users){
        res.json(users);
    })
})

router.get('/signup',function(req,res){
    res.render('signup');
})

router.post('/signup',function(req,res){
    console.log(req.body)
    db.User.create({
        name:req.body.name,
        password:req.body.password
    }).then(function(newUser){
        console.log(newUser)
        res.json(newUser);
    })
})

router.get('/login',function(req,res){
    res.render('login')
})

router.post('/login',function(req,res){
    db.User.findOne({
        where:{
            name:req.body.name
        }}).then(function(dbUser){
        if(bcrypt.compareSync(req.body.password,dbUser.password)) {
            req.session.user = dbUser
        }
        else {
            req.session.user= false;
            req.session.error = 'auth failed bro'
        }
        res.json(req.session);
    })
})

router.get('/logout',function(req,res){
    req.session.destroy(function(){
        res.send('successfully logged out')
    })
})

router.get('/readsessions',function(req,res){
    res.json(req.session);
})

module.exports = router;