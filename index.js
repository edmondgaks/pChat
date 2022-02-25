const parse = require('csv-parse');
const fs = require('fs');
const results = [];

function isHabitablePlanet(planet) {
    return planet['kio_disposition'] === 'CONFIRMED'
    && planet['kio_insol'] > 0.36 && planet['kio_insol'] < 1,11;
}


fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if(isHabitablePlanet(data)) {
            results.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', ()=> {
        console.log(results);
        console.log('done');
    });