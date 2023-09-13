import { useNavigate } from "react-router-dom";

const ReservationLabel = ({ idResto }) => {
  const navigate = useNavigate();
  return (
    <button
      className="flex h-fit min-w-[8rem] items-center rounded-full bg-[#ffedc3] px-2 py-1 shadow-md duration-500 hover:scale-110 hover:shadow-lg"
      onClick={() => navigate("/reservation/add/" + idResto)}
    >
      <div className="mx-1 h-2 w-2 rounded-full bg-[#FFB100]" />
      <p className="w-full text-center text-sm font-semibold md:text-base">
        Book a table
      </p>
    </button>
  );
};

export default ReservationLabel;
