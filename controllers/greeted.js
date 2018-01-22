const express = require('express');
const router = express.Router();


/**
 * GET success page
 */
router.get('/', (req, res, next) => {
    res.render('ordered', { title: 'Greeting Card: Successfully Greeted' });
});

module.exports = router;
