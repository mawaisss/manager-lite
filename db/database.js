const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/main.db');

db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    role TEXT
  )`);
  db.run(`INSERT OR IGNORE INTO users (id, username, password, role)
          VALUES (1, 'admin', 'admin123', 'Admin')`);

  // Employees table
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    role TEXT,
    balance REAL,
    status TEXT
  )`);
  // Projects table
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    client TEXT,
    status TEXT,
    location TEXT
  )`);
  // Clients table
  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    company_no TEXT,
    email TEXT,
    phone TEXT,
    mobile TEXT,
    trn TEXT,
    address TEXT
  )`);
  // Quotations table (updated: added project field)
  db.run(`CREATE TABLE IF NOT EXISTS quotations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT,
    client TEXT,
    project TEXT,
    date TEXT,
    total REAL
  )`);
  // Invoices table
  db.run(`CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT,
    client TEXT,
    date TEXT,
    total REAL
  )`);
  // Purchase Orders table
  db.run(`CREATE TABLE IF NOT EXISTS purchaseOrders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT,
    supplier TEXT,
    date TEXT,
    total REAL
  )`);
  // Expenses table
  db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    category TEXT,
    amount REAL,
    notes TEXT
  )`);
  // Attendance table
  db.run(`CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    employee TEXT,
    status TEXT
  )`);
  // Assets table
  db.run(`CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    serial_no TEXT,
    location TEXT,
    condition TEXT
  )`);
  // To-Do table
  db.run(`CREATE TABLE IF NOT EXISTS todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT,
    due_date TEXT,
    status TEXT
  )`);
  // Reports table (placeholder)
  db.run(`CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report TEXT
  )`);
  // Meetings table
  db.run(`CREATE TABLE IF NOT EXISTS meetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    subject TEXT,
    notes TEXT
  )`);
  // Settings table (placeholder)
  db.run(`CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config TEXT
  )`);
});

module.exports = db;
