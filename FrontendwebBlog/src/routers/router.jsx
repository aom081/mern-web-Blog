import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Create from "../pages/Create";
import PostDetail from "../pages/PostDetail";
import Register from "../pages/Register";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/edit/:id", element: <Edit /> },
    { path: "/create", element: <Create /> },
    { path: "/post/:id", element: <PostDetail /> },
    { path: "/register", element: <Register /> },
]);

export default router;
