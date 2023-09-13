import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/dataUserResponse";
import { useNavigate, useParams } from "react-router-dom";
import ErrorLabel from "../../assets/components/Label/ErrorLabel";
import SuccessLabel from "../../assets/components/Label/SuccessLabel";
import axios from "axios";
import Loading from "../../assets/components/Loading";
const UpdateUser = () => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setError] = useState([]);
  const [successMsg, setSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { token, dataUser } = useSelector(
    (state) => state.dataUserResponseRedux,
  );
  const param = useParams();
  useEffect(() => {
    if (dataUser != "" && token != "") {
      (param.id != undefined || param.id != null) &&
        (dataUser.role != "App_Admin" ? navigate("/") : getDataUser());
    } else {
      navigate("/login");
    }
  }, []);
  const getDataUser = async () => {
    const url =
      (param.id != undefined || param.id != null) &&
      `${import.meta.env.VITE_HOST_URL}/api/user/` + param.id;
    await axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data.payload);
      })
      .catch((e) => {
        console.log(e);
        if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else if (
          typeof e.response.data != "object" &&
          e.response.status == 403
        ) {
          navigate("/login");
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setIsLoading(true);
    await axios
      .put(
        `${import.meta.env.VITE_HOST_URL}/api/user/update`,
        {
          id:
            param.id != undefined || param.id != null ? param.id : dataUser.id,
          fullName: data.get("fullName"),
          username: data.get("username"),
          email: data.get("email"),
          password: data.get("password") == "" ? null : data.get("password"),
          role: data.get("role") == "" ? null : data.get("role"),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((res) => {
        if (res.data.status) {
          setSuccess([...successMsg, res.data.message]);
          if (
            param.id == undefined ||
            param.id == null ||
            param.id == user.id
          ) {
            setSuccess([...successMsg, ["User Updated You must Re-Login"]]);
            dispatch(logout());
            setTimeout(() => {
              navigate("/Login");
            }, 1500);
          } else {
            setTimeout(() => {
              navigate("/user");
            }, 1500);
          }
        }
      })
      .catch((error) => {
        if (error.code == "ERR_NETWORK") {
          setError([...errorMsg, [error.message]]);
        } else {
          setError([...errorMsg, error.response.data.message]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="relative flex h-[calc(100svh-55px)] items-center justify-center bg-white ">
      <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
      <SuccessLabel successMsg={successMsg} />
      <div className="relative z-10 flex h-full w-full bg-white px-4 py-20 sm:max-h-[45rem] sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReservation</p>
        </div>
        {isLoading && <Loading />}
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="py-4 font-serif text-3xl font-bold text-[#FFB100]">
            Update Data User
          </p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={handleSubmit}
          >
            <label htmlFor="fullName">Full Name*</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Full Name"
              name="fullName"
              defaultValue={
                param.id == undefined || param.id == null
                  ? dataUser.fullName
                  : user != null
                  ? user.fullName
                  : ""
              }
            />
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              className="rounded-md border p-2 px-4"
              placeholder="Username"
              name="username"
              defaultValue={
                param.id == undefined || param.id == null
                  ? dataUser.username
                  : user != null
                  ? user.username
                  : ""
              }
            />
            <label htmlFor="email">E-mail*</label>
            <input
              type="email"
              className="rounded-md border p-2 px-4"
              placeholder="email"
              name="email"
              defaultValue={
                param.id == undefined || param.id == null
                  ? dataUser.email
                  : user != null
                  ? user.email
                  : ""
              }
            />
            {(param.id == undefined || param.id == null) && (
              <div className="flex flex-col gap-3">
                <label htmlFor="password">Update Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  className="rounded-md border p-2 px-4"
                  placeholder="Password"
                  name="password"
                />
              </div>
            )}
            {(dataUser.role == "App_Admin" || dataUser.role == "Super_Admin") &&
              (param.id != undefined || param.id != null) && (
                <div className="flex flex-col gap-3">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    className="rounded-md border p-2 px-4"
                    name="role"
                  >
                    <option
                      value="Restaurant_Admin"
                      selected={
                        user != null ? user.role == "Restaurant_Admin" : false
                      }
                    >
                      Restaurant Admin
                    </option>
                    <option
                      value="Customer"
                      selected={user != null ? user.role == "Customer" : false}
                    >
                      Customer
                    </option>
                    <option
                      value="App_Admin"
                      selected={user != null ? user.role == "App_Admin" : false}
                    >
                      App Admin
                    </option>
                  </select>
                </div>
              )}
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={() => setShowPass(!showPass)}
                id="showPass"
                className="checked:accent-[#FFB100]"
              />
              <label for="showPass" htmlFor="showPass">
                Show Password
              </label>
            </div>
            <button
              className="rounded-full bg-[#FFB100] py-3 text-white"
              type="submit"
            >
              Update data user
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
