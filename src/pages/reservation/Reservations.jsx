import { useNavigate } from "react-router-dom";
import ReservationCard from "../../assets/components/ReservationCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ErrorLabel from "../../assets/components/ErrorLabel";
import SuccessLabel from "../../assets/components/SuccessLabel";

const Reservations = () => {
  const [errorMsg, setError] = useState([]);
  const { token, dataUser } = useSelector(
    (state) => state.dataUserResponseRedux,
  );
  const navigate = useNavigate();
  const [reservations, setReservations] = useState(null);
  const [successMsg, setSuccess] = useState([]);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    if (dataUser != "" && token != "") {
      getReservation();
    } else {
      navigate("/login");
    }
  }, [isChange]);
  const getReservation = async () => {
    const access =
      dataUser.role == "Customer"
        ? `customer/${dataUser.id}`
        : dataUser.role == "Restaurant_Admin"
        ? `restaurant/${dataUser.id}`
        : `appadmin`;
    await axios
      .get(`${import.meta.env.VITE_HOST_URL}/api/reservation/${access}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.payload != null) {
          res.data.payload.length == undefined || res.data.payload.length > 0
            ? setReservations(res.data.payload)
            : res.data.payload.length == 0 && setReservations(null);
        }
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
  const handleStatus = async (status, id) => {
    console.log(
      `${
        import.meta.env.VITE_HOST_URL
      }/api/reservation/restaurant/${status}/${id}`,
    );
    await axios
      .put(
        `${
          import.meta.env.VITE_HOST_URL
        }/api/reservation/restaurant/${status}/${id}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((res) => {
        setSuccess([...successMsg, res.data.message]);
        setIsChange(!isChange);
        setReservations(null);
        setTimeout(() => {
          setSuccess([]);
        }, 1500);
      })
      .catch((e) => {
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
  return (
    <div className="flex min-h-[calc(100vh-55px)] flex-col items-center py-10">
      <ErrorLabel errorMsg={errorMsg} func={() => setError([])} />
      <SuccessLabel successMsg={successMsg} />
      <div className="p-10">
        <h1 className="text-center text-2xl font-semibold">Reservation</h1>
        <p className="max-w-[25rem] text-center">
          Your reservation history is here, you can check reservation status and
          edit data reservation.
        </p>
      </div>
      <ul className="w-full max-w-5xl px-5">
        {reservations != null ? (
          Object.entries(reservations).map((reservation, key) => {
            return (
              <ReservationCard
                reservationData={reservation[1]}
                key={key}
                func={handleStatus}
              />
            );
          })
        ) : (
          <p className="w-full text-center">No Reservation Data</p>
        )}
      </ul>
    </div>
  );
};

export default Reservations;
