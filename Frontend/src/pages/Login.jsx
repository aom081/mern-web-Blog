import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";
import swal from "sweetalert2";
import { useAuthContext } from "../context/Authcontext";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { login, user: loggedUser } = useAuthContext();

  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser]);

  const navigate = useNavigate();

  const handleChang = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(user.username, user.password);
      console.log(currentUser);
      if (currentUser.status === 200) {
        swal.fire({
          title: "User login",
          text: currentUser.data.message,
          icon: "success",
        }).then(() =>{
          login(currentUser.data);
          navigate("/");
        })
        setUser({
          username: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      swal.fire({
        title: "User login",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Log in</h2>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleChang}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={handleChang}
          />
        </label>

        <div className="card-actions gap-30">
          <button className="btn btn-primary" onClick={handleSubmit}>
            log in
          </button>
          <button className="btn btn-primary btn-outline">cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
