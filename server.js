const express = require('express')
const app = express()
const database = require('./database')

people = database.getPopulation()

function getPerson(uid){
    for(var i in people){
        if(people[i].uid == uid){
            return people[i]
        }
    }
}

function findMatches(uid){
    var person = getPerson(uid)
    var bestScore = -1
    var bestPerson = {}
    for(var i in people){
        if(person.uid != people[i].uid && score(person, people[i]) > bestScore){
            bestScore = score(person, people[i])
            bestPerson = people[i]
        }
    }
    return bestPerson
}

function score(personA, personB){
    var points = 0
    for(var i in personA.interests){
        points += personB.interests.includes(personA.interests[i]) ? 1 : 0
    }
    return points
}

app.use(express.static('static'))

app.get('/', function (req, res) {
  res.sendFile("./static/index.html")
})

app.get('/submit/:data/', function(req, res) {
    var json = req.params.data
    var uid = Math.random().toString()
    var person = JSON.parse(json)
    person.uid = uid
    people.push(person)
    res.send(uid)
})

app.get('/results/:uid', function(req, res){
    res.send(findMatches(req.params.uid))
})

app.get('/results', function(reqa, res){
    res.sendFile(__dirname + "/static/results.html")
})

app.get('/allpeople', function(req, res){
    res.send(people)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

