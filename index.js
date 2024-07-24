const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const db = require('./model/db')
const router = express.Router()
const portals = require('./routes/routes.js')
const PORT = 5000
const multer = require('multer')
const password = 'sjsschooladdis'

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/posts')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)){
            return cb(new Error('Only Imagesa are allowed'))
        }
        cb(undefined,true)
    }
})

app.set('view engine','ejs')
app.use('/',portals)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/post',upload.single('file'),(req,res)=>{
    let title = req.body.title
    let subtitle = req.body.subtitle
    let content = req.body.content
    let file = req.file.filename
    let pwd = req.body.password
    
    if (!title || !subtitle || !content || !file || !pwd) {
        return res.render('blogform', {message: 'All fields are required' });
    }
   
   if(pwd == password){
        let sql = `INSERT INTO blog(title,subtitle,content,img) VALUES ("${title}","${subtitle}","${content}","${file}")`
        db.query(sql,(err,result)=>{
        if(err) throw err
        console.log('INSERTED!')
        res.redirect('blog?uploaded=true')
        }) 
   }else{
       res.render('blogform',{uploaded:false}) 
  }
})

app.post('/contactUs',(req,res)=>{
    let name = req.body.name
    let email = req.body.email
    let subject = req.body.subject
    let message = req.body.message

    if (!name || !email || !subject || !message) {
        return res.render('contactUs', { mess: 'All fields are required' });
    }
    
    let sql = `INSERT INTO comments(name,email,subject,message) VALUES("${name}","${email}","${subject}","${message}")`;
    db.query(sql,(err,result)=>{
        if(err) throw err
        console.log('INSERTED')
        res.render('contactUs',{mess:'comment sent'})
    })
})

app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`)
})