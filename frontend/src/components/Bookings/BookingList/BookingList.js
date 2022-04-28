import "./BookingList.css";

export default function BookingList({ bookings, onDelete }) {
  return (
    <ul className="bookings-list">
      {bookings.map((booking) => {
        return (
          <li key={booking._id} className="bookings-item">
            <div className="bookings-item-data">
              {booking.event.title} -{" "}
              {new Date(booking.createdAt).toLocaleDateString()}
            </div>
            <div className="bookings-item-actions">
              <button
                className="btn"
                onClick={onDelete.bind(this, booking._id)}
              >
                Cancel
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
