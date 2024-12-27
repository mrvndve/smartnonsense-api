const router = require("express").Router();
const auth = require("../../middlewares/auth");
const {
  fetchQuestionsService,
  createQuestionService,
  updateQuestionService,
  singleDeleteService,
  multipleDeleteService,
} = require("../../services/questionsService");
const errorHandler = require("../../middlewares/errorHandler");

router.get("/", auth, async (req, res, next) => {
  try {
    const serviceRes = await fetchQuestionsService(req?.query);
    res.status(serviceRes?.status).json(serviceRes);
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const serviceRes = await createQuestionService(req.body);
    res.status(serviceRes?.status).json(serviceRes);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const id = req?.params?.id ?? null;
    const serviceRes = await updateQuestionService(id, req.body);
    res.status(serviceRes?.status).json(serviceRes);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const id = req?.params?.id ?? null;

    const isHardDelete = !req?.query?.isHardDelete
      ? 0
      : req?.query?.isHardDelete === "true"
      ? 1
      : 0;

    const serviceRes = await singleDeleteService(id, isHardDelete);
    res.status(serviceRes?.status).json(serviceRes);
  } catch (err) {
    next(err);
  }
});

router.delete("/", auth, async (req, res, next) => {
  try {
    const isHardDelete = !req?.query?.isHardDelete
      ? 0
      : req?.query?.isHardDelete === "true"
      ? 1
      : 0;

    const serviceRes = await multipleDeleteService(req.body, isHardDelete);
    res.status(serviceRes?.status).json(serviceRes);
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler);

module.exports = router;
