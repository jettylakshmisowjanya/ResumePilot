import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Login from "../pages/Login";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {user ? (
        <div
          style={{
            minHeight: "100vh",
            background: "#070b17",
            color: "#fff",
          }}
        >
          <Navbar />

          <main
            style={{
              minHeight: "calc(100vh - 70px)",
              background:
                "linear-gradient(to bottom right, #070b17, #0f172a, #020617)",
            }}
          >
            <Outlet />
          </main>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;