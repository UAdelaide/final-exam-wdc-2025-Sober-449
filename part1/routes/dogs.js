const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/dogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
      FROM Dogs
      JOIN Users ON Dogs.owner_id = Users.user_id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching dog data:', error);
    res.status(500).json({ error: 'Failed to retrieve dogs' });
  }
});

module.exports = router;
