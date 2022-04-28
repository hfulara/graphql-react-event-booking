import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";
import { AuthProvider } from "./context/auth-context";
import { RequireAuth } from "./context/require-auth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MainNavigation />
        <main className="main-content">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/events" element={<Events />} />
            <Route
              path="/bookings"
              element={
                <RequireAuth>
                  <Bookings />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </AuthProvider>
    </div>
  );
}

export default App;
