import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aside from "./components/Aside.jsx";
import Modal from "./modal/popup.jsx";
import Layout from "./components/Layout";
import Loading from "./components/Loader.jsx";
import { ToastContainer } from 'react-toastify';
import LogOut from "./components/Logout.jsx";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/protectedRoute.jsx';
const Dashboard = React.lazy(() => import("../src/pages/Dashboard.jsx"));
const Users = React.lazy(() => import("../src/pages/Users.jsx"));

function App() {
  return (
    <>
    <ToastContainer 
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"/>

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
      <LogOut/>
      <Aside />
      <Modal />
      
    </>
  );
}

export default App;
