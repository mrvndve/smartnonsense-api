const router = require("express").Router();

router.use("/questions", require("./questionsRoutes"));

module.exports = router;
