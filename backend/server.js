require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour activer CORS
app.use(cors({ origin: true }));

// Configuration de la connexion à MySQL avec createPool()
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Endpoint pour ajouter un nouveau contact
app.post('/contacts', async (req, res) => {
  const { nom, prenom, phone, email, services, message } = req.body;
  if (!nom || !prenom || !phone || !email || !services || !message) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    // Obtenir une connexion à partir du pool
    const connection = await pool.getConnection();

    try {
      // Exécuter la requête SQL
      const [results, fields] = await connection.execute(
        'INSERT INTO clients (nom, prenom, email, phone, services, message) VALUES (?, ?, ?, ?, ?, ?)', 
        [nom, prenom, email, phone, services, message]
      );

      // Envoyer une réponse au client
      res.status(201).json({ message: 'Contact enregistré avec succès' });
    } finally {
      // Libérer la connexion, même en cas d'erreur
      connection.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du contact' });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
