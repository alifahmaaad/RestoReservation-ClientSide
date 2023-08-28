import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorLabel from "../assets/components/ErrorLabel";
const Register = ({ role }) => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataRes, setDataRes] = useState();
  const [errorMsg, setError] = useState(["bang bang", "nada"]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setIsLoading(true);
    await axios
      .post("https://restoreserve.azurewebsites.net//api/user/register", {
        fullName: data.get("fullName"),
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        role: role,
      })
      .then((res) => {
        setDataRes(res.data.payload);
        if (role == "Admin_Restaurant") {
          navigate("/registerresto/resto");
        } else {
          navigate("/Login");
        }
      })
      .catch((error) => {
        setError([...errorMsg, error.response.data.message]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="relative flex h-[calc(100svh-55px)] items-center justify-center bg-white ">
      <div className="relative z-10 flex h-full w-full bg-white px-4 py-20 sm:max-h-[45rem] sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl">
        <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
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
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="py-4 font-serif text-3xl font-bold text-[#FFB100]">
            {role == "Customer" ? "Register" : "Register Admin Restaurant"}
          </p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={handleSubmit}
          >
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Full Name"
              name="fullName"
              required
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Username"
              name="username"
              required
              pattern="^\S+$"
              title="Space Not Allowed"
              min={5}
              max={15}
            />
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="rounded-md border p-2 px-4"
              placeholder="email"
              name="email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="rounded-md border p-2 px-4"
              placeholder="Password"
              name="password"
              required
              minLength={8}
            />
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => setShowPass(!showPass)}
                className="checked:accent-[#FFB100]"
              />
              <label htmlFor="showPass">Show Password</label>
            </div>
            <button
              className="rounded-full bg-[#FFB100] py-3 text-white"
              type="submit"
            >
              Register
            </button>
          </form>
          {role == "Customer" ? (
            <div className="flex flex-wrap gap-1 py-4 font-serif">
              <p>Want to be a partner?</p>
              <a className="text-[#FFB100]" href="/registerresto">
                Sign Up as Restaurant Admin
              </a>
            </div>
          ) : (
            <div className="flex gap-1 py-4 font-serif">
              <p>Sign up as customer?</p>
              <a className="text-[#FFB100]" href="/register">
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
