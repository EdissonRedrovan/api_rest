const express = require('express');
const authController = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.post('/login', function(req, res) {
    const { email, password } = req.body;
    
    authController.login(email, password)
        .then(token => {
            response.success(req, res, { token }, 200);
        })
        .catch(error => {
            response.error(req, res, error, 400);
        });
});

router.post('/registro', function(req, res) {
    authController.registro(req.body)
        .then(token => {
            response.success(req, res, { token }, 201);
        })
        .catch(error => {
            response.error(req, res, error, 400);
        });
});

module.exports = router;