const express = require('express')
const app = new express()
const path = require('path')
app.listen(6050, ()=> {
    console.log('App running on port 6050')
})

//body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//ejs template
const ejs = require('ejs')
app.set('view engine', 'ejs')

//mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true})
//BlogPost module
const BlogPost = require('./models/BlogPost')


//for making static files such as css visible
app.use(express.static('public'))

app.get('/', async (req,res)=> {
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    const blogposts = await BlogPost.find({})
    res.render('index', {
        //blogposts: blogposts
        //since the key(blogposts) and value(blogposts) of the object are the same, we can use only one name
        blogposts
    });
})
app.get('/posts/new', (req,res)=>{
    res.render('create')
})
app.get('/about', (req,res)=> {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
})
app.get('/contact', (req,res)=> {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
})
app.get('/post', (req,res)=> {
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('post')
})

/*for getting the blog from the form using the POST method. 
User will be redirected to the home page after submitting the form*/
app.post('/posts/store', (req,res)=>{
    console.log(req.body)
    res.redirect('/')
})
//this function stores the users' blog to the DB
app.post('/posts/store', async (req,res)=> {
    await BlogPost.create(req.body, (error, blogpost)=>{
        res.redirect('/')
    })
})

