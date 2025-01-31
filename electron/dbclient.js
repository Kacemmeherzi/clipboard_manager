const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Open the database (if the file doesn't exist, SQLite will create it)
const db = new sqlite3.Database(path.join(__dirname, "Database.db"), (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Database opened or created successfully");
  }
});

// Function to create a table if it doesn't exist
const createTable = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS clipboards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL)`;

  db.run(createTableSQL, (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table created or already exists");
    }
  });
};

// Function to insert a user into the users table
const insertClipboard = (content) => {
  const stmt = db.prepare("INSERT INTO clipboards (content) VALUES (?)");
  stmt.run(content, (err) => {
    if (err) {
      console.error("Error inserting user:", err);
    } else {
      console.log(`User ${content} added successfully`);
    }
  });
  stmt.finalize();
};

// Function to query all users
const getAllClipBoards = (callback) => {
  db.all("SELECT * FROM clipboards", (err, rows) => {
    if (err) {
      console.error("Error fetching clipboards:", err);
    } else {
      callback(rows);
    }
  });
};

// Function to close the database connection
const closeDatabase = () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err);
    } else {
      console.log("Database closed successfully");
    }
  });
};

// Exporting functions
module.exports = {
  createTable,
  insertClipboard,
  getAllClipBoards,
  closeDatabase,
};
