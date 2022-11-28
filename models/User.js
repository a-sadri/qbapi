import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    email: {},
    password: {},
    photo: {},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
