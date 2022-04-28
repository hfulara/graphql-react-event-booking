import React from "react";
import "./EventItem.css";

export default function EventItem({
  eventId,
  userId,
  creatorId,
  title,
  price,
  date,
  onDetail,
}) {
  console.log(userId, creatorId);
  return (
    <li key={eventId} className="events-list-item">
      <div>
        <h1>{title}</h1>
        <h2>
          ${price} - {new Date(date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {userId === creatorId ? (
          <p>You are the owner of this event.</p>
        ) : (
          <button className="btn" onClick={onDetail.bind(this, eventId)}>
            View Details
          </button>
        )}
      </div>
    </li>
  );
}
