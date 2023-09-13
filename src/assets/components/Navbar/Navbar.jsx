import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/dataUserResponse";
import NavbarMobile from "./NavbarMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState(false);
  const { dataUser } = useSelector((state) => state.dataUserResponseRedux);
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
        <div className="flex w-[calc(100svw-10px)] items-center justify-between gap-3 md:w-[80vw]">
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
          <NavbarMobile />
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
                onClick={() => {
                  setisOpen(!isOpen);
                }}
                className="flex items-center gap-2 font-sans font-semibold text-[#FFB100] after:translate-x-5 after:translate-y-0.5 after:-rotate-90 after:gap-5 after:content-['\276E']"
              >
                <FontAwesomeIcon icon={faUser} />
                <p className="text-black">{dataUser.username}</p>
              </button>
            )}
            {isOpen && (
              <div className="absolute translate-y-11 rounded-md bg-white p-3 shadow-2xl">
                <div className="flex flex-col items-start gap-3 px-4">
                  <button
                    onClick={() => {
                      setisOpen(!isOpen);
                      navigate("/user/update");
                    }}
                  >
                    <p className="w-full text-center text-sm  md:text-base">
                      Edit Profile
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      setisOpen(!isOpen);
                      navigate("/resto/update");
                    }}
                    className={
                      dataUser.role != "Restaurant_Admin" ? "hidden" : ""
                    }
                  >
                    <p className="w-full text-center text-sm  md:text-base">
                      Edit Restaurant
                    </p>
                  </button>
                  <button
                    className="flex min-w-[8rem] items-center rounded-full bg-[#ffedc3] px-2 shadow-md duration-500 hover:scale-110 hover:shadow-lg"
                    onClick={() => {
                      dispatch(logout());
                      setisOpen(!isOpen);
                      navigate("/login");
                    }}
                  >
                    <p className="w-full text-center text-sm font-semibold md:text-base">
                      logout
                    </p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
