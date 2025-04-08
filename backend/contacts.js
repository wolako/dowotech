const express = require('express');
const router = express.Router();

// Route GET pour tester si l'API fonctionne
router.get('/', (req, res) => {
    res.json({ message: 'Contacts API is working!' });
});
module.exports = router;