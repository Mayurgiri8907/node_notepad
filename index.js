const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
    fs.readdir('file', function(err,files){

        res.render("index",{files:files});
    })
})

app.get("/file/:filename",function(req,res){
    fs.readFile(`./file/${req.params.filename}`,"utf-8",function(err,data){
        res.render("show",{filename: req.params.filename,data:data})
    })
})


app.get("/edit/:filename",function(req,res){
    res.render('edit',{filename:req.params.filename})
})

app.post("/edit",function(req,res){
    fs.rename(`./file/${req.body.privi}`,`./file/${req.body.new}.txt`,function(err){
        res.redirect("/")
    })
    // console.log(req.body);
})

app.get("/delete:filename",function(req,res){
  fs.rm(`./file/${req.params.filename}`, function(err){
    res.redirect("/")
  })
})


app.post("/create",function(req,res){
    fs.writeFile(`./file/${req.body.filename.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/")
    })
})

app.listen(port || 3000);