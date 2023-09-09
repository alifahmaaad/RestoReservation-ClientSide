import { useNavigate } from "react-router-dom";
import ReservationCard from "../../assets/components/ReservationCard";
import { useEffect } from "react";

const Reservations = () => {
  const { token, dataUser } = useSelector(
    (state) => state.dataUserResponseRedux,
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (dataUser != "" && token != "") {
      dataUser.role != "Customer" && navigate("/");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex min-h-[calc(100vh-55px)] flex-col items-center py-10">
      <div className="p-10">
        <h1 className="text-center text-2xl font-semibold">Reservation</h1>
        <p className="max-w-[25rem] text-center">
          Your reservation history is here, you can check reservation status and
          edit data reservation.
        </p>
      </div>
      <ul className="w-full max-w-5xl px-5">
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
        <ReservationCard />
      </ul>
    </div>
  );
};

export default Reservations;
