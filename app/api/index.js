const express = require('express')
var router = module.exports = express.Router()



router.use('/coromandel', require('./coromandel'))
// router.use('/auth', require('./auth'))

router.use(function (req, res) {
    res.status(404).send({
        success: false,
        message: "Not an API route"
    });
});