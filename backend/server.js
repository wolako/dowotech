require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3001;
const crypto = require('crypto');
const { exec } = require('child_process');
const mysql = require('mysql2/promise');
const cors = require('cors');

// Initialisation de l'application
const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/webhook',
          express.raw({ type: 'application/json' }),
          (req, res) => {
        const secret = process.env.GITHUB_WEBHOOK_SECRET;
        const signature = req.headers['x-hub-signature-256'];
        const payload = req.body;

        // Sécurité : vérifier que le payload est bien un Buffer
        if (!payload || !Buffer.isBuffer(payload)) {
          console.warn("⚠️ Payload invalide ou non brut");
          return res.status(400).json({ error: 'Payload invalide ou non brut' });
        }

        console.log("Secret utilisé (extrait) :", secret?.substring(0, 6) + '...');
        console.log("Payload reçu (hex) :", payload.toString('hex'));

        if (!signature || !secret) {
          return res.status(403).json({ error: 'Signature ou secret manquant' });
        }

// Vérification de la signature
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(payload);
        const digest = `sha256=${hmac.digest('hex')}`;

        console.log("Signature calculée sur le serveur : ", digest);
        console.log("Signature envoyée par GitHub : ", signature);

        if (signature !== digest) {
          return res.status(403).json({ error: 'Signature invalide' });
        }

// Exécution du script de déploiement
        exec('/home/wolako/scripts/deploy.sh', (error, stdout, stderr) => {
             if (error) {
                console.error(`Erreur d'exécution : ${error.message}`);
                return res.status(500).json({
                  message: 'Échec du déploiement',
                  stdout: stdout,
                  stderr: stderr,
                  error: error.message
                });
             }
             console.log(`✅ Déploiement stdout:\n${stdout}`);
             console.error(`🧾 Déploiement stderr:\n${stderr}`);
             res.send('Déploiement réussi');
        });
});

app.use(express.json());
app.use(cors({ origin: ['https://www.dowotech.com', 'https://dowotech.com'] }));

// Middleware de log des requêtes
app.use((req, res, next) => {
   console.log(`  Requête reçue : ${req.method} ${req.url}`);
   console.log("  Corps de la requête :", JSON.stringify(req.body, null, 2));

   if (req.headers['content-type'] === 'application/json' && Buffer.isBuffer(req.body)) {
      console.warn("⚠️ req.body est un Buffer pour cette requête (raw)");
    } else {
      console.log("  Corps de la requête :", JSON.stringify(req.body, null, 2));
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
    //console.log("Champ(s) manquant(s) :", { nom, prenom, phone, email, service, message });
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

// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${port}`);
  console.log('Webhook actif sur : /webhook');
});