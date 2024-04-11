const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile('dist/index.html', { root: __dirname });
});

module.exports = router;
