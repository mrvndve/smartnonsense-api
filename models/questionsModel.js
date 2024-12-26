const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  question: { type: String, required: true },
  solution: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  options: [
    {
      orderNumber: { type: Number, required: true, min: 1 },
      value: { type: String, required: true },
    },
  ],
  steps: [
    {
      orderNumber: { type: Number, required: true, min: 1 },
      title: { type: String, required: true },
      result: { type: String, required: true },
      imageUrl: { type: String },
    },
  ],
  imgUrl: { type: String },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

// Update timestamps on document modification
questionsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Questions", questionsSchema);
