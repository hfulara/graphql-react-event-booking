const mongoose = require("mongoose");
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

module.exports = mongoose.model("User", userSchema);
