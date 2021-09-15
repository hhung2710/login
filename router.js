const express = require('express');
const router = express.Router();
const logincontroller = require('./controller');

router.post("/signup", logincontroller.signup);

router.post("/login", logincontroller.login);

router.get("/get", logincontroller.get);

module.exports = router;