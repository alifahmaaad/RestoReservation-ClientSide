import { useEffect, useState } from "react";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });
  return (
    <div className="relative z-50 pt-[55px]">
      <div
        className={
          (navbar && "bg-white shadow-md ") +
          " fixed left-0 top-0 flex h-[55px] max-h-[55px] w-full justify-center duration-300"
        }
      >
        <div className="flex w-[calc(100svw-10px)] items-center justify-between gap-3 md:w-[calc(100svw-100px)]">
          <div className="flex gap-4">
            <a className="flex items-center gap-2" href="/">
              <p className="text-3xl font-bold">
                RR<b className="text-[#FFB100]">.</b>
              </p>
              <p className="font-mono font-bold">RestoReserve</p>
            </a>
            <ul className="flex items-center gap-5 px-5">
              <li className="opacity-50 duration-500 hover:opacity-100">
                <a
                  href="/"
                  className="border-b-4 border-[#FFB100] p-2 px-5 font-semibold"
                >
                  Restaurant
                </a>
              </li>
              <li>
                <a
                  href="/reservation"
                  className="border-b-4 border-[#FFB100] p-2 px-5 font-semibold"
                >
                  Reservation
                </a>
              </li>
              <li className="opacity-50 duration-500 hover:opacity-100">
                <a
                  href="/user"
                  className="border-b-4 border-[#FFB100] p-2 px-5 font-semibold"
                >
                  User
                </a>
              </li>
            </ul>
          </div>
          <div>
            <a
              className="flex min-w-[8rem] items-center rounded-full bg-[#ffedc3] px-2 py-1 shadow-md duration-500 hover:scale-110 hover:shadow-lg"
              href="/login"
            >
              <p className="w-full text-center text-sm font-semibold md:text-base">
                login
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
