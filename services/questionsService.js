const QuestionsModel = require("../models/questionsModel");
const {
  createUpdateSchema,
  deleteMultipleSchema,
} = require("./schemas/questionsSchemas");

const HttpReponse = require("../helpers/httpResponse");
const { getPartialSchema } = require("../helpers/schema");

const fetchQuestionsService = async (queryParams = {}) => {
  try {
    let res = {
      status: 200,
      errors: null,
      message: null,
      data: null,
    };

    const { isActive, isDeleted, tags } = queryParams;

    const query = [
      {
        $match: {
          ...(isActive
            ? { isActive: isActive === "true" }
            : { isActive: true }),
          ...(isDeleted
            ? { isDeleted: isDeleted === "true" }
            : { isDeleted: false }),
          ...(tags ? { tags: { $in: JSON.parse(tags) } } : {}),
        },
      },
      {
        $addFields: {
          options: {
            $sortArray: { input: "$options", sortBy: { orderNumber: 1 } },
          },
          steps: {
            $sortArray: { input: "$steps", sortBy: { orderNumber: 1 } },
          },
        },
      },
    ];

    const data = await QuestionsModel.aggregate(query);

    return {
      ...res,
      data,
      message: "Questions fetched successfully",
    };
  } catch (err) {
    throw err;
  }
};

const createQuestionService = async (reqBody) => {
  try {
    let res = {
      status: HttpReponse.OK,
      errors: null,
      message: null,
    };

    const { error: payloadErr } = createUpdateSchema.validate(reqBody);

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

const updateQuestionService = async (id, reqBody) => {
  try {
    let res = {
      status: HttpReponse.OK,
      errors: null,
      message: null,
    };

    const partialSchema = getPartialSchema(reqBody, createUpdateSchema);

    const { error: payloadErr } = partialSchema.validate(reqBody, {
      abortEarly: false,
    });

    if (payloadErr) {
      return {
        ...res,
        status: HttpReponse.UNPROCESSABLE,
        errors: payloadErr.details,
        message: "Invalid Payload",
      };
    }

    const updatedQuestion = await QuestionsModel.findByIdAndUpdate(id, {
      $set: reqBody,
    });

    if (!updatedQuestion) {
      return {
        ...res,
        status: HttpReponse.NOT_FOUND,
        message: "Question not found",
      };
    }

    return {
      ...res,
      message: "Question has been updated successfully.",
    };
  } catch (err) {
    throw err;
  }
};

const singleDeleteService = async (id, isHardDelete) => {
  try {
    let res = {
      status: HttpReponse.OK,
      errors: null,
      message: null,
    };

    let deletedQuestion = null;
    if (isHardDelete) {
      deletedQuestion = await QuestionsModel.deleteOne({ _id: id });
    } else {
      deletedQuestion = await QuestionsModel.findByIdAndUpdate(id, {
        $set: { isDeleted: true },
      });
    }

    if (!deletedQuestion) {
      return {
        ...res,
        status: HttpReponse.NOT_FOUND,
        message: "Question not found",
      };
    }

    return {
      ...res,
      message: `Question ${id} has been deleted successfully.`,
    };
  } catch (err) {
    throw err;
  }
};

const multipleDeleteService = async (reqBody, isHardDelete) => {
  try {
    let res = {
      status: HttpReponse.OK,
      errors: null,
      message: null,
    };

    const { error: payloadErr } = deleteMultipleSchema.validate(reqBody);

    if (payloadErr) {
      return {
        ...res,
        status: HttpReponse.UNPROCESSABLE,
        errors: payloadErr.details,
        mesage: "Invalid Payload",
      };
    }

    let deletedQuestions = null;

    if (isHardDelete) {
      deletedQuestions = await QuestionsModel.deleteMany({
        _id: { $in: reqBody?.ids },
      });
    } else {
      deletedQuestions = await QuestionsModel.updateMany(
        { _id: { $in: reqBody?.ids } },
        { $set: { isDeleted: true } }
      );
    }

    if (
      !deletedQuestions ||
      deletedQuestions?.matchedCount === 0 ||
      deletedQuestions?.deletedCount === 0
    ) {
      return {
        ...res,
        status: HttpReponse.NOT_FOUND,
        message: "Question not found",
      };
    }

    return {
      ...res,
      message: `Question/s has been deleted successfully.`,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchQuestionsService,
  createQuestionService,
  updateQuestionService,
  singleDeleteService,
  multipleDeleteService,
};
