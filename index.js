//import express and express-ejs-layouts
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
//creating an instance of an express app
const app = express()
PORT = 8000

//tell express that I'm using ejs as the view engine
app.set('view engine', 'ejs')
//tell my app that I'm using ejs layouts
app.use(ejsLayouts)

app.get('/', (req, res) => {
    res.render('home.ejs')
})

// INDEX ROUTE
app.get('/dinosaurs', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})



app.listen(8000, () => {
    console.log(`cruddy dinos on ${PORT}`)
})