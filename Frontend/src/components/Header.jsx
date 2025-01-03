import React, { useContext, useState, useEffect } from "react";
import { useAuthContext } from "../context/Authcontext";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Header = () => {
  const [user, setUser] = useState(null);
  const { user: savedUser, logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(savedUser);
  }, [savedUser]);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire(
          "Logged out",
          "You have been logged out successfully.",
          "success"
        );
      }
    });
  };

  const menus = [
    {
      link: "/create",
      text: "Create new post",
    },
  ];

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          ></ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          SE NPRU Blog 014
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menus.map((item, index) => (
            <li key={index}>
              <a href={item.link}>{item.text}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {location.pathname === "/login" || location.pathname === "/register" ? (
          <button
            className="btn btn-outline btn-info"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        ) : user ? (
          <>
            <a
              href={`/author/${PostDetail.author._id}`}
              className="btn btn-secondary text-white"
            >
              {user.username}
            </a>
            <a className="btn btn-info" href="/create">
              Create new post
            </a>
            <button className="btn btn-outline btn-info" onClick={handleLogout}>
              Logout ({user.username})
            </button>
          </>
        ) : (
          <>
            <a className="btn btn-info" href="/login">
              Login
            </a>
            <a className="btn btn-outline btn-info" href="/register">
              Register
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
