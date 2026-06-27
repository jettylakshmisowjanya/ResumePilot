import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Preview from "./pages/Preview.jsx";
import { useDispatch } from "react-redux";
import api from "./configs/api.js";
import { useEffect, useState } from "react";
import { login, setLoading } from "./app/features/authSlice.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: {
            Authorization: token,
          },
        });
        if (data.user) {
          dispatch(
            login({
              user: data.user,
              token: token,
            }),
          );
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="app/builder/:resumeId" element={<ResumeBuilder />} />
        <Route path="view/:resumeId" element={<Preview />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
