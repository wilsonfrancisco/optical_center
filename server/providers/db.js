import path from 'path';
import sqlite3 from 'sqlite3';

const dbFilePath = path.join(process.cwd(), 'tracking_information.db');

function openDb() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log('Conectado ao banco de dados SQLite.');
        resolve(db);
      }
    });
  });
}

const STARTING_POINT_ROW = 6;

async function initializeDb() {
  try {
    const db = await openDb();

    await new Promise((resolve, reject) => {
      db.run(
        `CREATE TABLE IF NOT EXISTS tracking (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          last_inserted_row INTEGER NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`,
        (err) => (err ? reject(err) : resolve())
      );
    });

    const result = await new Promise((resolve, reject) => {
      db.get(
        'SELECT last_inserted_row FROM tracking ORDER BY id DESC LIMIT 1',
        (err, row) => (err ? reject(err) : resolve(row))
      );
    });

    if (!result) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO tracking (last_inserted_row) VALUES (?)',
          [STARTING_POINT_ROW],
          (err) => (err ? reject(err) : resolve())
        );
      });
    }

    db.close();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function getLastInsertedRow() {
  try {
    const db = await openDb();
    const result = await new Promise((resolve, reject) => {
      db.get(
        'SELECT last_inserted_row FROM tracking ORDER BY id DESC LIMIT 1',
        (err, row) => (err ? reject(err) : resolve(row))
      );
    });
    db.close();
    return result ? result.last_inserted_row : STARTING_POINT_ROW;
  } catch (error) {
    console.error('Error getting last inserted row:', error);
    return STARTING_POINT_ROW;
  }
}

async function updateLastInsertedRow(row) {
  try {
    const db = await openDb();
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO tracking (last_inserted_row) VALUES (?)',
        [row],
        (err) => (err ? reject(err) : resolve())
      );
    });
    db.close();
  } catch (error) {
    console.error('Error updating last inserted row:', error);
  }
}

export { initializeDb, getLastInsertedRow, updateLastInsertedRow };
