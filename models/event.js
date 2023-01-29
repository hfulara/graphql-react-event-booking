import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const Scheme = mongoose.Schema;

const eventSchema = new Scheme({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: Scheme.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Event", eventSchema);
