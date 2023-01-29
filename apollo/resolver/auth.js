import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authResolvers = {
  Query: {
    login: async (_root, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User does not exist!");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error("Password is incorrect!");
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          "supersecretkey",
          { expiresIn: "1h" }
        );
  
        return {
          userId: user.id,
          token: token,
          tokenExpiration: 1,
        };
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createUser: async (_root, args) => {
      try {
        const existingUser = await User.findOne({ email: args.userInput.email });
        if (existingUser) {
          throw new Error("User already exist.");
        }
        const hashPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
          email: args.userInput.email,
          password: hashPassword,
        });
        const result = await user.save();
        return { ...result._doc };
      } catch (err) {
        throw err;
      }
    }
  }
}
export default authResolvers;
  
