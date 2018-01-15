const express = require('express');
const router = express.Router();


/**
 * GET success page
 */
router.get('/', (req, res, next) => {
    res.render('success', { title: 'Greeting Card: Successfully Ordered' });
});

module.exports = router;
