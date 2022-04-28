import { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import Spinner from "../components/Spinner/Spinner";
import BookingList from "../components/Bookings/BookingList/BookingList";

function Bookings() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const requestBody = {
      query: `
          query {
            bookings {
              _id
             createdAt
             event {
               _id
               title
               date
             }
            }
          }
        `,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.user?.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setIsLoading(false);
        setBookings(resData.data.bookings);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [auth.user?.token]);

  const deleteBookingHandler = (bookingId) => {
    setIsLoading(true);
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            _id
            title
          }          
        }
      `,
      variables: {
        id: bookingId,
      },
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.user?.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setIsLoading(false);
        setBookings(() => {
          return bookings.filter((booking) => {
            return booking._id === bookingId;
          });
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <BookingList bookings={bookings} onDelete={deleteBookingHandler} />
  );
}

export default Bookings;
