const { Insulina, InsulData } = require('../controllers/form.controller');

const router = require('express').Router();

router.get('/insulina',Insulina);

router.post('/insulina',InsulData);

module.exports = router