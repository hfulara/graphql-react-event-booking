import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import { useAuth } from "../../context/auth-context";

function MainNavigation() {
  const auth = useAuth();
  console.log("Navigation - ", auth);
  return (
    <header className="main-navigation">
      <div className="main-navigation-logo">
        <h1>EasyEvent</h1>
      </div>
      <nav className="main-navigation-items">
        <ul>
          {!auth.user?.token && (
            <li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          {auth.user?.token && (
            <>
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li>
                <button onClick={auth.logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
