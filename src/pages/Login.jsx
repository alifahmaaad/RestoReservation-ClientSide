import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [dataRes, setDataRes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dataSelector = useSelector((state) => state.dataUserResponseRedux);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setIsLoading(true);
    await axios
      .post("http://localhost:8080/api/user/login", {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((res) => {
        setDataRes(res.data);
        if (res.data.status) {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        navigate("/");
      });
  };
  return (
    <div className="relative flex h-[calc(100vh-55px)] items-center justify-center overflow-x-hidden bg-white">
      <div className="relative z-10 flex h-full w-full bg-white py-20 sm:max-h-[35rem] sm:max-w-[30rem] sm:rounded-lg sm:shadow-xl">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        {isLoading && (
          <div className="absolute right-0 top-0 m-5  flex items-center gap-2">
            <p className="text-sm font-bold">Loading</p>
            <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-black" />
          </div>
        )}
        <div className="flex w-full flex-col items-center justify-center ">
          <p className="font-serif text-3xl font-bold text-[#FFB100]">Login</p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={handleSubmit}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="rounded-full border p-2 px-4"
              placeholder="Username"
              name="username"
            />
            <label htmlFor="password">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="rounded-full border p-2 px-4"
              placeholder="Password"
              name="password"
            />
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => setShowPass(!showPass)}
                className=""
              />
              <label htmlFor="showPass">Show Password</label>
            </div>
            <button
              className="rounded-full bg-[#FFB100] py-3 text-white"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="flex gap-1 py-4 font-serif">
            <p>No Account?</p>
            <a className="text-[#FFB100]" href="/register">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
