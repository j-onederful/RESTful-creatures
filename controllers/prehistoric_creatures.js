//import express
const express = require('express')
//creat an express router
const router = express.Router()

const fs = require('fs')

// INDEX ROUTE
router.get('/', (req, res)=>{
    let preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let preCreatureData = JSON.parse(preCreatures)
    
    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        preCreatureData = preCreatureData.filter(preCreature=>preCreature.name.toLowerCase()===nameFilter.toLowerCase() )
    }

    res.render('prehistoric_creatures/index.ejs', {mypreCreature: preCreatureData})
})

//NEW PREHISTORIC CREATURES FORM ROUTE -- needs to be above show route
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new.ejs')
} )

//SHOW ROUTE (a specific PREHISTORIC CREATURE)
router.get('/:id', (req, res)=>{
    //get the array of PRECREAS from the json
    let preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let preCreatureData = JSON.parse(preCreatures)
    //identify the index of the preCreature in question
    let preCreatureIndex = req.params.id
    console.log(`The prehistoric creature ur searching for is ${preCreatureIndex}`)
    //isolate the preCreature in question
    console.log(preCreatureData[preCreatureIndex])
    res.render('prehistoric_creatures/show.ejs', {mypreCreature: preCreatureData[preCreatureIndex]})
})

//POST A NEW PREHISTORIC CREATURES ROUTE
router.post('/', (req, res)=> {
    //get the array of preCreature from the json
    let preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let preCreatureData = JSON.parse(preCreatures)

    //add the new preCreature to the array
    preCreatureData.push(req.body)

    //save the preCreatures to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(preCreatureData))


    //redirect to the index route
    res.redirect('/prehistoric_creatures')
})

//GET /precreatures/edit/:id --- a view of a form to edit a specific precreature @ :id
router.get('/edit/:id', (req, res) => {
    //get the precreature data and render the edit form
    const preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    const preCreatureData = JSON.parse(preCreatures)

    res.render('prehistoric_creatures/edit.ejs', {
        creatureId: req.params.id,
        preCreature: preCreatureData[req.params.id]
    })
})

//PUT /prehistoric_creatures/:id --- update a preCreature @ :id in the database
router.put('/:id', (req, res) => {
    //get the preCreatures from the preCreature json
    const preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    const preCreatureData = JSON.parse(preCreatures)
    console.log(req.params.id, req.body)
    
    //update the preCreature based on the req.params.id and the req.body
    //req.params = which preCreature
    //req.body = preCreature data to be updated
    preCreatureData[req.params.id].type = req.body.type
    preCreatureData[req.params.id].img_url = req.body.img_url
    
    //write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(preCreatureData))

    //redirect to some place that has interesting data
    res.redirect('/prehistoric_creatures') //go back to all preCreatures
    // res.redirect(`/prehistoric_creatures/${req.params.id}`) //just see this one preCreatures

    // res.send(`update a preCreature @ ${req.params.id}`)
})


//Delete /prehistoric_creatures/:id --- DESTROY a preCreature @ :id
router.delete('/:id', (req, res) => {
    //get the preCreatures from the preCreature json
    const preCreatures = fs.readFileSync('./prehistoric_creatures.json')
    const preCreatureData = JSON.parse(preCreatures)
   
    //splice preCreature out of the array(index from the req.params)
    //Array.splice(starting index tot remove, how many elements to remove)
    preCreatureData.splice(req.params.id, 1)

    //save the preCreature json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(preCreatureData))

    //redirect to see all preCreatures
    res.redirect('/prehistoric_creatures')

    // res.send(`DESTROY a preCreature @ ${req.params.id}`)
})


module.exports = router