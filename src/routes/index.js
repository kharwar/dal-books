import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, ForgotPassword, AddBook } from "../pages";

const AppRoutes = () => {
  console.log("app");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/add-book" element={<AddBook />} />
    </Routes>
  );
};

export default AppRoutes;
