var faker = require('faker')

function getPopulation(){
    var population = []
    for(var i = 0; i < 1000; i++){
        population.push(getFakePerson())
    }

    return population
}


function getFakePerson(){
    return {
        name: faker.name.findName(),
        age: Math.floor(Math.random()*100),
        contact: faker.phone.phoneNumber(),
        interests: getRandomInterests()
    }
}

var interests =['skiing', 'snowboarding', 'football', 'soccer', 'baseball', 'gardening', 'dreaming', 'birdwatching', 'skydiving', 'diving', 'swimming', 'hiking', 'netflix', 'rock', 'breaking bad', 'programming', 'anime', 'reading', 'books', 'writing', 'smoking', 'weed', 'smoking weed', 'computers', 'linux', 'starbucks', 'drugs', 'movies', 'terrorism']

function getRandomInterests(){
    var result = []
    while(Math.random() < 0.7){
        var interest = interests[Math.floor(Math.random()*interests.length)]
        if(!result.includes(interest)) result.push(interest)
    }
    return result
}

module.exports = {getPopulation: getPopulation}