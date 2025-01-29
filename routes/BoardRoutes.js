const express = require('express');
const router = express.Router();
const { GetAllplayers, GetOneplayers, createplayers, Updateplayers, Deleteplayers, Resetplayers
} = require('../services/Boardservice');

// API Routes
router.route('/').get(GetAllplayers).post(createplayers);
router.route('/:id').get(GetOneplayers).put(Updateplayers).delete(Deleteplayers);
router.route('/players/reset').put(Resetplayers);

module.exports = router;
