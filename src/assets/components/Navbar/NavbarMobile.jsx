import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/dataUserResponse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavbarMobile = () => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.dataUserResponseRedux);
  const [isOpen, setisOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
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
            (isOpen ? "absolute -rotate-45 " : "") + "h-[2px] w-4 bg-[#FFB100]"
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
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 font-sans font-semibold text-[#FFB100]">
                <FontAwesomeIcon icon={faUser} />
                <p className="text-black opacity-70">{dataUser.username}</p>
              </div>
              <div className="flex flex-col items-start gap-3 ">
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
                  onClick={() => {
                    dispatch(logout());
                    setisOpen(!isOpen);
                    navigate("/login");
                  }}
                >
                  <p className="w-full text-center text-sm font-semibold text-blue-400 md:text-base">
                    logout
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
