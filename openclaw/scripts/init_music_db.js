const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'data', 'wqor_music_library.db');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the WQOR Music Library SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Drop table if it exists to start fresh for this script, or comment out in prod
        // db.run(`DROP TABLE IF EXISTS tracks`);

        // Create the tracks table
        db.run(`CREATE TABLE IF NOT EXISTS tracks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT DEFAULT 'Suno / Ray',
      album TEXT,
      genre TEXT,
      vibe TEXT NOT NULL,         -- e.g., 'morning_frequency', '3rd_timeline_lounge', 'oasis_nights'
      file_path TEXT NOT NULL,
      duration_seconds INTEGER,
      bpm INTEGER,
      lyrics TEXT,                -- Full lyrics or path to lyrics file
      play_count INTEGER DEFAULT 0,
      last_played DATETIME,
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Tracks table created or verified successfully.');
            }
        });

        console.log('Database initialization complete.');
        db.close();
    });
}
