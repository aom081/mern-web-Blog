import React, { userContext } from "react";
import { useAuthContext } from "../context/Authcontext";
import Swal from "sweetalert2";
const header = () => {
  const { user, logout } = useAuthContext();
  const menus = [
    {
      link: "/create",
      Text: "Create new post",
    },
  ];

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
        Swal.fire({
          title: "Logout",
          text: "You have been logged out",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          ></ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">SE NPRU Blog 014</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menus?.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.link}>{item.Text}</a>
              </li>
            );
          })}
        </ul>
      </div>
      {user ? (
        <>
          <div className="navbar-end gap-2">
            <a className="btn btn-info" href="/create">
              {" "}
              Create new post{" "}
            </a>
            <a className="btn btn-outline btn-info" href="/logout">
              {" "}
              logout ({user.username}){" "}
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-end gap-2">
            <a className="btn btn-info" href="/login">
              {" "}
              login{" "}
            </a>
            <a className="btn btn-outline btn-info" href="/register">
              {" "}
              register{" "}
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default header;
