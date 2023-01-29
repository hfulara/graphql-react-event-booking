import Booking from '../../models/booking.js';
import Event from '../../models/event.js';
import { transformBooking, transformEvent } from './merge.js';

const bookingResolver = {
  Query: {
    bookings: async (_root, args, req) => {
      console.log('isAuth', req.isAuth);
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        const bookings = await Booking.find({ user: req.userId });
        return bookings.map((booking) => {
          return transformBooking(booking);
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    bookEvent: async (_root, args, req) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
          user: req.userId,
          event: fetchedEvent,
        });
        const result = await booking.save();
        return transformBooking(result);
      } catch (err) {
        throw err;
      }
    },
    cancelBooking: async (_root, args, req) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      try {
        const booking = await Booking.findById(args.bookingId).populate("event");
        const event = transformEvent(booking.event);
        await Booking.deleteOne({ _id: args.bookingId });
        return event;
      } catch (err) {
        throw err;
      }
    },
  }
};
export default bookingResolver;