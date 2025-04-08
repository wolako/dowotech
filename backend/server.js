require('dotenv').config();
const express = require('express');
//const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
//const contactsRouter = require('./contacts');

// Initialisation de l'application
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour activer CORS

app.use(cors({ origin: ['https://www.dowotech.com', 'https://dowotech.com'] }));

// Middleware de log des requêtes
app.use((req, res, next) => {
   console.log(`  Requête reçue : ${req.method} ${req.url}`);
   console.log("  Corps de la requête :", JSON.stringify(req.body, null, 2));   

   if (!req.body || Object.keys(req.body).length === 0) {
      console.warn("⚠️ ATTENTION : req.body est vide !");
   }
   next();
});

// Configuration de la connexion à MySQL avec createPool()
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Route de test
app.get("/", (req, res) => {
    res.send("Backend fonctionne !");
});

app.get("/api/", (req, res) => {
    res.json({ message: "API fonctionne !" });
});

// ✅ Route Debug pour tester `req.body`
app.post('/debug-body', (req, res) => {
   console.log("Données reçues sur /debug-body :", req.body);
   res.json({ receivedBody: req.body });
});

// app.use('/api/contacts', contactsRouter);

app.options('/api/contacts', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).send();
});

// Route POST pour enregistrer un contact
app.post('/api/contacts', async (req, res) => {
  console.log("Données reçues par le serveur:", JSON.stringify(req.body, null, 2));

  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("⚠️ ERREUR : req.body est vide !");
  }

  const { nom, prenom, phone, email, service, message } = req.body;

  if (!nom || !prenom || !phone || !email || !service || !message) {
    console.log("Champ(s) manquant(s) :", { nom, prenom, phone, email, service, message });
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.execute(
        'INSERT INTO clients (nom, prenom, email, phone, service, message) VALUES (?, ?, ?, ?, ?, ?)',
        [nom, prenom, email, phone, service, message]
      );

      console.log("✅ Insertion réussie :", results);
      res.status(201).json({ id: results.insertId, message: 'Contact enregistré avec succès' });
    } finally {
      connection.release();
    }
  }catch (error) {
    console.error("Erreur MySQL :", error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du contact' });
  }

});

console.log("✅ Routes enregistrées dans Express :");
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
     console.log(`- ${r.route.path}`);
  }
});

// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${port}`);
});