const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const path = require('path')

function openDB() {
	return open({
		filename: path.resolve('./db/todos.db'),
		driver: sqlite3.Database,
	})
};

async function initDb() {
	const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
	    name TEXT NOT NULL,
	    email TEXT NOT NULL,
      completed INTEGER DEFAULT 0,
      edited INTEGER DEFAULT 0
    )
  `)
}

initDb();

module.exports = openDB;