import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Create from "../pages/Create";
import PostDetail from "../pages/PostDetail";
import Register from "../pages/Register";
import Layout from "../layout/Layout";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout component จะครอบ Children ทั้งหมด
    children: [
      { path: "/", element: <Home /> }, // เส้นทางสำหรับ Home
      { path: "edit/:id", element: <Edit /> }, // เส้นทางสำหรับ Edit
      { path: "create", element: <Create /> }, // เส้นทางสำหรับ Create
      { path: "post/:id", element: <PostDetail /> }, // เส้นทางสำหรับ PostDetail
      { path: "register", element: <Register /> }, // เส้นทางสำหรับ Register
      { path: "login", element: <Login /> }, // เส้นทางสำหรับ Login
    ],
  },
]);

export default router;
