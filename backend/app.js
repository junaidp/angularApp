const express = require('express');
const bodyParser = require('body-Parser');
const Post = require('./models/post')
const mongoose = require('mongoose');
const app =  express();

mongoose.connect("mongodb+srv://junaidp:sA1azNacv8vnrgKJ@cluster0-wxkrw.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
    console.log('mongo connected');
})
.catch(() => {
    console.log('monog connection failed' + ex);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept"
         );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
    //const post = req.body;
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost =>{
        console.log(post);
        res.status(201).json({
            message: 'post added',
            postId: createdPost._id
        });
    });   
});

app.get('/api/posts', (req, res, next) => {
    /*const posts =[
        {
         id: 'dssdd',
         title: 'dddd',
          content: 'conttt'
        },
        {
            id: 'dssdd11',
            title: 'dddd22',
             content: 'conttt33'
           }
    ];*/
    //res.json(posts);
    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'posts fetched',
            posts: documents
        });
    });
    
});

app.delete("/api/posts/:id", (req, res, next) =>{
    console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
    });
    res.status(200).json({message: "POst deleted"});
})
module.exports = app;