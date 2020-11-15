const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

(async() => {
  const database = await sqlite.open({
    filename: './tmp/cities.sqlite',
    driver: sqlite3.Database
  });
  console.log(database);
})();