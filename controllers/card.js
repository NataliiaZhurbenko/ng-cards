const express = require('express');
const router = express.Router();


/**
 * GET card page
 */
router.get('/', (req, res, next) => {
    res.render('card', { title: 'Greeting Card: Greeting' });
});

module.exports = router;
