const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function openDatabase() {
  return sqlite.open({
    filename: './tmp/cities.sqlite',
    driver: sqlite3.Database
  });
}

(async () => {
  const database = await openDatabase();
  await database.exec(`
  CREATE TABLE IF NOT EXISTS countries(
    id INTEGER,
    name TEXT NOT NULL,
    PRIMARY KEY(id, name));
  `);
  await database.exec(`
  CREATE TABLE IF NOT EXISTS cities(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );
  `);
  await database.exec(`
  CREATE TABLE IF NOT EXISTS names(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );
  `);
  await database.close();
})();

async function getCities(callback) {
  const database = await openDatabase();
  const result = await database.all('SELECT id, name FROM cities;');

  callback(result);
}

function addCity(city) {
  (async () => {
    const database = await openDatabase();

    const cityCount = await database.get('SELECT COUNT(*) FROM cities;');
    await database.run(`
    INSERT INTO cities(id, name) VALUES (?, ?);
    `,
      Object.values(cityCount)[0],
      city);
    await database.close();
  })();
}

function removeCity(city) {
  (async () => {
    const database = await openDatabase();

    await database.run(`
      DELETE FROM cities WHERE
        name = ?;
    `,
      city);
    await database.close();
  })();
}

module.exports.getCities = getCities;
module.exports.addCity = addCity;
module.exports.removeCity = removeCity;