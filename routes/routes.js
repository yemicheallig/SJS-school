const express = require('express')
const multer = require('multer')
const db = require('../model/db')
const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/index',(req,res)=>{
    res.render('index')
})
router.get('/aboutUs',(req,res)=>{
    res.render('aboutUs')
})
router.get('/contactUs',(req,res)=>{
    res.render('contactUs',{mess:null})
})

router.get('/blog',(req,res)=>{
    const upload = req.query.uploaded
    let sql = 'SELECT * FROM blog'
    db.query(sql,(err,data)=>{
        if(err) throw err
        res.render('blog',{blogData:data,uploaded:null,upload})
    })
})

router.get('/blogform',(req,res)=>{
    res.render('blogform',{uploaded:null,message:null})
})

const apwd = 'adminsjsschool'
router.get('/comments',(req,res)=>{
    res.render('admin',{error:null})
})

router.post('/comments',(req,res)=>{
    let adminPassword = req.body.password
    if(adminPassword == apwd){
    let sql = 'SELECT * FROM comments'
    db.query(sql,(err,data)=>{
        if(err) throw err
        res.render('comments',{comment:data})
    })
    console.log(req.body)
    }else{
        res.render('admin',{error:true})
    }
})

router.get('/admin',(req,res)=>{
    res.render('admin',{error:null})
})

module.exports = router