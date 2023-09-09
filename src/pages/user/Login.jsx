import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorLabel from "../../assets/components/ErrorLabel";
import { set } from "../../redux/slices/dataUserResponse";
import SuccessLabel from "../../assets/components/SuccessLabel";
import Loading from "../../assets/components/Loading";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState([]);
  const [successMsg, setSuccess] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setIsLoading(true);
    await axios
      .post(`${import.meta.env.VITE_HOST_URL}/api/user/login`, {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((res) => {
        setSuccess([...successMsg, res.data.message]);
        setTimeout(() => {
          if (res.data.status) {
            dispatch(set(res.data.payload));
            if (res.data.payload.user.role == "Restaurant_Admin") {
              navigate("/resto/create");
            } else {
              navigate("/");
            }
          }
        }, 1000);
      })
      .catch((error) => {
        if (error.code == "ERR_NETWORK") {
          setError([...errorMsg, error.message]);
        } else {
          setError([...errorMsg, ...error.response.data.message]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="relative flex h-[calc(100vh-55px)] items-center justify-center overflow-x-hidden bg-white">
      <div className="relative z-10 flex h-full w-full bg-white py-20 sm:max-h-[35rem] sm:max-w-[30rem] sm:rounded-lg sm:shadow-xl">
        <SuccessLabel successMsg={successMsg} />
        <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        {isLoading && <Loading />}
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
                id="showPass"
                className="checked:accent-[#FFB100]"
              />
              <label for="showPass">Show Password</label>
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
