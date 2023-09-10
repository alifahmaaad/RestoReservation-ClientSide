import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/dataUserResponse";
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.dataUserResponseRedux);
  const [isOpen, setisOpen] = useState(false);
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
              <p className="font-mono font-bold">RestoReservation</p>
            </a>
            <ul className="hidden items-center gap-5 px-5 md:flex">
              <li
                className={
                  (window.location.pathname == "/"
                    ? "opacity-100 after:w-full "
                    : "opacity-50 after:w-0 ") +
                  "flex flex-col pt-2  duration-500 after:h-1 after:bg-[#FFB100] after:duration-700 after:content-[''] hover:opacity-100 hover:after:w-full"
                }
              >
                <a href="/" className=" px-5 font-semibold ">
                  Home
                </a>
              </li>
              <li
                className={
                  (window.location.pathname == "/reservation"
                    ? "opacity-100 after:w-full "
                    : "opacity-50 after:w-0 ") +
                  "flex flex-col pt-2  duration-500 after:h-1 after:bg-[#FFB100] after:duration-700 after:content-[''] hover:opacity-100 hover:after:w-full"
                }
              >
                <a href="/reservation" className=" px-5 font-semibold ">
                  Reservation
                </a>
              </li>
              {dataUser.role == "App_Admin" && (
                <li
                  className={
                    (window.location.pathname == "/user"
                      ? "opacity-100 after:w-full "
                      : "opacity-50 after:w-0 ") +
                    "flex flex-col pt-2  duration-500 after:h-1 after:bg-[#FFB100] after:duration-700 after:content-[''] hover:opacity-100 hover:after:w-full"
                  }
                >
                  <a href="/user" className=" px-5 font-semibold ">
                    User
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div
            className={
              (isOpen ? "translate-y-2 " : "") +
              "group absolute right-0 top-0 z-50 flex flex-col gap-1 p-5 font-bold duration-700 md:hidden"
            }
            onClick={() => setisOpen(!isOpen)}
          >
            <span
              className={
                (isOpen ? "rotate-45 " : "") +
                "h-[2px] w-4 bg-[#FFB100]  duration-700"
              }
            />
            <span
              className={
                (isOpen ? "opacity-0 " : "opacity-100 ") +
                "h-[2px] w-4 bg-[#FFB100]  duration-700"
              }
            />
            <span
              className={
                (isOpen ? "absolute -rotate-45 " : "") +
                "h-[2px] w-4 bg-[#FFB100]"
              }
            />
          </div>
          <div
            className={
              (isOpen
                ? "h-full w-screen opacity-100"
                : "h-full w-0 px-0 opacity-0") +
              " nav fixed left-0 top-0 z-30 flex flex-col justify-between gap-5 overflow-hidden bg-white p-5 pt-14 font-semibold shadow-lg duration-700"
            }
          >
            <ul className="flex-col items-center gap-5 px-5">
              <li
                className={
                  (window.location.pathname == "/"
                    ? "opacity-100 after:w-full "
                    : "opacity-50 after:w-0 ") +
                  "flex w-fit flex-col  pt-2 duration-500 after:h-1 after:bg-[#FFB100] after:duration-700 after:content-[''] hover:opacity-100 hover:after:w-full"
                }
              >
                <a href="/" className="font-semibold ">
                  Home
                </a>
              </li>
              <li
                className={
                  (window.location.pathname == "/reservation"
                    ? "opacity-100 after:w-full "
                    : "opacity-50 after:w-0 ") +
                  "flex w-fit flex-col  pt-2 duration-500 after:h-1 after:bg-[#FFB100] after:duration-700 after:content-[''] hover:opacity-100 hover:after:w-full"
                }
              >
                <a href="/reservation" className="font-semibold ">
                  Reservation
                </a>
              </li>
              {dataUser.role == "App_Admin" && (
                <li
                  className={
                    (window.location.pathname == "/user"
                      ? "opacity-100 after:w-full "
                      : "opacity-50 after:w-0 ") +
                    "flex w-fit flex-col  pt-2 duration-500 after:h-1 after:bg-[#FFB100] after:duration-700 after:content-[''] hover:opacity-100 hover:after:w-full"
                  }
                >
                  <a href="/user" className="font-semibold ">
                    User
                  </a>
                </li>
              )}
            </ul>
            <div className="p-5">
              {dataUser == "" ? (
                <a
                  className="flex min-w-[8rem] items-center rounded-full bg-[#ffedc3] px-2 py-1 shadow-md duration-500 hover:scale-110 hover:shadow-lg"
                  href="/login"
                >
                  <p className="w-full text-center text-sm font-semibold md:text-base">
                    login
                  </p>
                </a>
              ) : (
                <button
                  className="flex min-w-[8rem] items-center rounded-full bg-[#ffedc3] px-2 py-1 shadow-md duration-500 hover:scale-110 hover:shadow-lg"
                  onClick={(e) => {
                    dispatch(logout());
                  }}
                >
                  <p className="w-full text-center text-sm font-semibold md:text-base">
                    logout
                  </p>
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:flex">
            {dataUser == "" ? (
              <a
                className="flex min-w-[8rem] items-center rounded-full bg-[#ffedc3] px-2 py-1 shadow-md duration-500 hover:scale-110 hover:shadow-lg"
                href="/login"
              >
                <p className="w-full text-center text-sm font-semibold md:text-base">
                  login
                </p>
              </a>
            ) : (
              <button
                className="flex min-w-[8rem] items-center rounded-full bg-[#ffedc3] px-2 py-1 shadow-md duration-500 hover:scale-110 hover:shadow-lg"
                onClick={(e) => {
                  dispatch(logout());
                }}
              >
                <p className="w-full text-center text-sm font-semibold md:text-base">
                  logout
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
