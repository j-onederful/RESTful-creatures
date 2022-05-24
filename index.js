//import express and express-ejs-layouts
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const { route } = require('express/lib/application')
const fs = require('fs')
//creating an instance of an express app
const app = express()
PORT = 8000

//MIDDLEWARE
//tell express that I'm using ejs as the view engine
app.set('view engine', 'ejs')
//tell my app that I'm using ejs layouts
app.use(ejsLayouts)
//body parser middleware
app.use(express.urlencoded({extended:false}))
//allow non GET/POST methods forom an HTML 5
app.use(methodOverride('_method'))

app.use('/dinosaurs', require('./controllers/dinosaurs.js'))

app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))

//HOME ROUTE
app.get('/', (req, res) => {
    res.render('home.ejs')
})

/////////////////////////PREHISTORIC CREATURES/////////////////



app.listen(8000, () => {
    console.log(`cruddy dinos on ${PORT}`)
})