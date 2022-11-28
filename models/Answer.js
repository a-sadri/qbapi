import mongoose from 'mongoose';

const answerSchema = mongoose.Schema(
  {
    questionId: {
      type: String,
      unique: true,
    },
    chosenOption: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
        required: false,
      },
    ],
    // examineeId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:
    // }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Answer', answerSchema);
