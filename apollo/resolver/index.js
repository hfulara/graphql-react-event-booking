import authResolver from "./auth.js";
import eventResolver from "./event.js"; 
import bookingResolver from "./booking.js";

const rootResolver = {
  Query: {
    ...authResolver.Query,
    ...eventResolver.Query,
    ...bookingResolver.Query
  },
  Mutation: {
    ...authResolver.Mutation,
    ...eventResolver.Mutation,
    ...bookingResolver.Mutation
  }
};

export default rootResolver;
