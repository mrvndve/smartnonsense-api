const QuestionsModel = require("../models/questionsModel");
const { createSchema } = require("./schemas/questionsSchemas");
const HttpReponse = require("../helpers/httpResponse");

const createQuestionService = async (reqBody) => {
  try {
    let res = {
      status: HttpReponse.OK,
      errors: null,
      message: null,
    };

    const { error: payloadErr } = createSchema.validate(reqBody);

    if (payloadErr) {
      return {
        ...res,
        status: HttpReponse.UNPROCESSABLE,
        errors: payloadErr.details,
        mesage: "Invalid Payload",
      };
    }

    const newData = new QuestionsModel(reqBody);
    await newData.save();

    return {
      ...res,
      message: "Question has been created successfully.",
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createQuestionService,
};
