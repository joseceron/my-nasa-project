const { parse } = require('csv-parse');
const path = require('path');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] == 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
    )
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      ) // here we connect 2 strems this one(readable) and above writeable
      .on('data', (data) => {
        if (isHabitablePlanet(data)) habitablePlanets.push(data);
      })
      .on('error', (error) => {
        console.log(error);
        reject(error);
      })
      .on('end', (_) => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve(habitablePlanets);
      });
  });
}

// parse()

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};
