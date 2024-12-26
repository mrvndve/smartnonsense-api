const router = require("express").Router();
const auth = require("../../middlewares/auth");
const { createQuestionService } = require("../../services/questionsService");
const HttpReponse = require("../../helpers/httpResponse");

router.get("/", auth, async (req, res) => {
  try {
    res.status(200).json({ data: "test" });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    const createQuestionServiceRes = await createQuestionService(req.body);

    res.status(createQuestionServiceRes?.status).json(createQuestionServiceRes);
  } catch (err) {
    res.status(HttpReponse.INTERNAL_SERVER_ERROR).json({
      status: HttpReponse.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      errors: err.errors,
    });

    throw err;
  }
});

module.exports = router;
