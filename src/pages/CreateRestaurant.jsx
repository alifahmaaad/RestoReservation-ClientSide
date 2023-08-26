import { useState } from "react";

const CreateRestaurant = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="relative flex min-h-[calc(100svh-55px)] items-center justify-center bg-white ">
      <div className="relative z-10 flex h-full w-full bg-white px-4 py-20 sm:max-h-[45rem] sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="py-4 font-serif text-3xl font-bold text-[#FFB100]">
            Restaurant Register
          </p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
            }}
          >
            <label htmlFor="fullName">Restaurant Name</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Restorant Name"
              name="fullName"
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Username"
              name="username"
            />
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              className="rounded-md border p-2 px-4"
              placeholder="email"
              name="email"
            />
            <label htmlFor="photo">Restaurant Photo</label>
            <input
              type="file"
              className="rounded-md border p-2 px-4"
              placeholder="photo"
              name="photo"
            />
            <label htmlFor="password">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="rounded-md border p-2 px-4"
              placeholder="Password"
              name="password"
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
          <div className="flex gap-1 py-4 font-serif">
            <p>Sign up as customer?</p>
            <a className="text-[#FFB100]" href="/register">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurant;