import { useState } from "react";
import ModalReservationDetail from "../Modal/ModalReservationDetails";
import Approve from "../StatusReservation/Approve";
import Decline from "../StatusReservation/Decline";
import Pending from "../StatusReservation/Pending";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ReservationCard = ({ reservationData, func }) => {
  const [isOpen, SetIsOpen] = useState(false);
  const { dataUser } = useSelector((state) => state.dataUserResponseRedux);
  const navigate = useNavigate();
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
        setTimeout(() => {
          setSuccess([]);
        }, 1500);
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
  return (
    <div className="relative w-full rounded-md px-5 py-2 font-serif shadow-md">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold">{reservationData.restaurant.name}</p>
            {reservationData.statusReservation == "Pending" ? (
              <Pending />
            ) : reservationData.statusReservation == "Approve" ? (
              <Approve />
            ) : (
              <Decline />
            )}
          </div>
          <input
            className="my-2 bg-white"
            type="datetime-local"
            disabled
            defaultValue={reservationData.reservationDate}
          />
          <p>Number of guest : {reservationData.numberOfGuest}</p>
        </div>
        <div className="flex gap-5">
          {dataUser.role != "Restaurant_Admin" ? (
            <button
              className="font-mono text-[#FFB100] hover:drop-shadow-lg"
              onClick={() => {
                navigate(`/reservation/update/${reservationData.id}`);
              }}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                className="rounded-full border bg-[#00880d] px-2 font-mono text-white hover:shadow-lg"
                onClick={() => func("approve", reservationData.id)}
              >
                Aprrove
              </button>
              <button
                className="rounded-full border bg-[#e52535] px-2 font-mono text-white hover:shadow-lg"
                onClick={() => func("decline", reservationData.id)}
              >
                Decline
              </button>
            </>
          )}
          <button
            className="font-mono text-[#e52535] hover:drop-shadow-lg"
            onClick={() => {
              navigate(`/reservation/delete/${reservationData.id}`);
            }}
          >
            Delete
          </button>
          <button
            className="font-mono text-[#FFB100] hover:drop-shadow-lg"
            onClick={() => SetIsOpen(!isOpen)}
          >
            See details
          </button>
        </div>
      </div>
      <ModalReservationDetail open={isOpen} reservationData={reservationData} />
    </div>
  );
};

export default ReservationCard;
