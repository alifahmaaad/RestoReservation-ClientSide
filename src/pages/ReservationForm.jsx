import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ErrorLabel from "../assets/components/ErrorLabel";
import SuccessLabel from "../assets/components/SuccessLabel";
import Loading from "../assets/components/Loading";

const ReservationForm = () => {
  const { token, dataUser } = useSelector(
    (state) => state.dataUserResponseRedux,
  );
  const navigate = useNavigate();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setError] = useState([]);
  const [successMsg, setSuccess] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);
  useEffect(() => {
    if (dataUser != "" && token != "") {
      dataUser.role == "Restaurant_Admin" && navigate("/");
      dataUser.role == "Customer" && getRestaurant();
    } else {
      navigate("/login");
    }
  }, []);

  const getRestaurant = async () => {
    axios
      .get(`${import.meta.env.VITE_HOST_URL}/api/restaurant/${param.idResto}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRestaurantData(res.data.payload);
      })
      .catch((e) => {
        if (typeof e.response.data != "object" && e.response.status == 403) {
          navigate("/login");
        } else if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let dataReservation = {
      reservationDate: data.get("datetime"),
      numberOfGuest: data.get("numberofguest"),
      user: dataUser.id,
      restaurant: restaurantData.id,
    };
    setIsLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_HOST_URL}/api/reservation/customer/create`,
        dataReservation,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((res) => {
        setSuccess([...successMsg, res.data.message]);
        setTimeout(() => {
          if (res.data.status) {
            navigate("/restaurant/" + res.data.payload.restaurant.id);
          }
        }, 1500);
      })
      .catch((e) => {
        if (typeof e.response.data != "object" && e.response.status == 403) {
          navigate("/login");
        } else if (e.code == "ERR_NETWORK") {
          setError([...errorMsg, e.message]);
        } else {
          setError([...errorMsg, ...e.response.data.message]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="relative flex min-h-[calc(100svh-55px)] items-center justify-center bg-white ">
      <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
      <SuccessLabel successMsg={successMsg} />
      <div className="relative z-10 flex h-full w-full bg-white py-5 sm:max-h-[45rem] sm:max-w-[45rem] sm:rounded-lg sm:shadow-xl md:py-20">
        <div className="absolute left-0 top-0 hidden items-center gap-2 p-5 sm:flex">
          <p className="text-3xl font-bold">
            RR<b className="text-[#FFB100]">.</b>
          </p>
          <p className="font-mono font-bold">RestoReserve</p>
        </div>
        {isLoading && <Loading />}
        <div className="flex w-full flex-col items-center justify-center sm:max-w-7xl">
          <p className="font-serif text-3xl font-bold text-[#FFB100]">
            Reservation
          </p>
          <form
            className="flex h-full w-full flex-col justify-center gap-3 px-10"
            onSubmit={handleSubmit}
          >
            <label htmlFor="username">Username</label>
            {dataUser != "" && (
              <input
                type="text"
                className="rounded-md border p-2 px-4"
                placeholder="username"
                name="username"
                defaultValue={dataUser.username}
                disabled
              />
            )}
            <label htmlFor="restaurantname">Restaurant Name</label>
            {restaurantData != null && (
              <input
                type="text"
                className="rounded-md border p-2 px-4"
                placeholder="Restaurant Name"
                name="restaurantname"
                defaultValue={restaurantData.name}
                disabled
              />
            )}
            <label htmlFor="datetime">Datetime</label>
            <input
              type="datetime-local"
              className="rounded-md border p-2 px-4"
              placeholder="Datetime"
              name="datetime"
            />
            <label htmlFor="numberofguest">Number of guest</label>
            <input
              type="number"
              className="rounded-md border p-2 px-4 "
              placeholder="Number of guest"
              name="numberofguest"
            />
            <button
              className="rounded-full bg-[#FFB100] py-3 text-white"
              type="submit"
            >
              Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
