import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const Scheme = mongoose.Schema;

const userSchema = new Scheme({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Scheme.Types.ObjectId,
      ref: "Event",
    },
  ],
});

export default mongoose.model("User", userSchema);
