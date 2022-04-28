import EventItem from "./EventItem/EventItem";
import "./EventList.css";

export default function EventList({ events, authUserId, onViewDetail }) {
  const eventsList = events.map((event) => {
    return (
      <EventItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price={event.price}
        date={event.date}
        userId={authUserId}
        creatorId={event.creator._id}
        onDetail={onViewDetail}
      />
    );
  });
  return <ul className="event-list">{eventsList}</ul>;
}
