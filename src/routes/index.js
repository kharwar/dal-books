import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Review } from "../pages";

const AppRoutes = () => {
  console.log("app");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/review" element={<Review />} />
    </Routes>
  );
};

export default AppRoutes;
