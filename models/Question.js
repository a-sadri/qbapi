import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a name value'],
      unique: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Question', questionSchema);
