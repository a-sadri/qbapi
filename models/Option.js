import mongoose from 'mongoose';

const optionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Option', optionSchema);
